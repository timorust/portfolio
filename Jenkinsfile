pipeline {
  agent any

  environment {
    IMAGE_NAME = "timor1/portfolio"
    BUILD_NUMBER = "${BUILD_NUMBER}"
    VENV_PATH = "/var/lib/jenkins/.ansible-venv"
  }

  stages {

    stage('Prepare Python Virtual Env') {
      steps {
        script {
          echo "🔧 Preparing Ansible environment..."
          if (!fileExists(VENV_PATH)) {
            sh "python3 -m venv ${VENV_PATH}"
            sh "${VENV_PATH}/bin/pip install --upgrade pip"
            sh "${VENV_PATH}/bin/pip install ansible kubernetes"
          } else {
            echo "✅ Virtual environment already exists"
          }

          sh "${VENV_PATH}/bin/ansible-galaxy collection install kubernetes.core --force"
        }
      }
    }

    stage('Run Ansible Playbook') {
      steps {
        script {
          echo "🚀 Running full Ansible playbook..."
          withEnv(["PATH=${VENV_PATH}/bin:$PATH", "KUBECONFIG=/home/jenkins/.kube/config"]) {
            dir('ansible') {
              sh "ansible-playbook -i inventory.ini site.yml"
            }
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          echo "🐳 Building Docker image..."
          sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker_hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            echo "📤 Pushing Docker image..."
            sh '''
              echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
              docker push $IMAGE_NAME:$BUILD_NUMBER
            '''
          }
        }
      }
    }

    stage('Deploy Updated Image to K3s') {
      steps {
        script {
          echo "🚢 Updating Deployment image in Kubernetes..."
          withEnv(["KUBECONFIG=/home/jenkins/.kube/config"]) {
            sh "kubectl set image deployment/portfolio-deployment portfolio=${IMAGE_NAME}:${BUILD_NUMBER} --record"
          }
        }
      }
    }

    stage('Deploy to AWS S3 via Terraform') {
    steps {
        dir('terraform-project') {
            sh 'terraform init'
            sh 'terraform apply -auto-approve'
        }
    }
}

  }

  post {
    success {
      echo "✅ Pipeline completed successfully! App deployed to K3s."
    }
    failure {
      echo "❌ Pipeline failed. Check logs."
    }
    always {
      echo "📋 Pipeline finished (success or failure)."
    }
  }
}
