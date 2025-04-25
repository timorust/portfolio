pipeline {
  agent any

  environment {
    IMAGE_NAME = "timor1/portfolio"
    VENV_PATH = "/var/lib/jenkins/.ansible-venv"
  }

  stages {

    stage('Run Ansible Playbook') {
      steps {
        script {
          echo "🔍 Checking virtual environment..."
          if (!fileExists(VENV_PATH)) {
            echo "🔧 Creating virtual environment..."
            sh "python3 -m venv ${VENV_PATH}"
            sh "${VENV_PATH}/bin/pip install --upgrade pip"
            sh "${VENV_PATH}/bin/pip install ansible"
          } else {
            echo "✅ Virtual environment already exists"
          }

          // התקנת הקולקשן של Kubernetes (גם אם ה־venv קיים)
          echo "📦 Installing Ansible Kubernetes collection..."
          sh "${VENV_PATH}/bin/ansible-galaxy collection install community.kubernetes"

          // ווידוא שקובץ ansible-playbook קיים
          sh "ls ${VENV_PATH}/bin/ansible-playbook"

          echo "🚀 Running Ansible playbook..."
          withEnv(["ANSIBLE_COLLECTIONS_PATH=${VENV_PATH}/collections:/root/.ansible/collections"]) {
            sh "${VENV_PATH}/bin/ansible-playbook -i ansible/inventory.ini ansible/site.yml"
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
            echo "📤 Pushing image to Docker Hub..."
            sh '''
              echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
              docker push $IMAGE_NAME:$BUILD_NUMBER
            '''
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          echo "🚢 Deploying to Kubernetes..."
          withEnv(["KUBECONFIG=/home/jenkins/.kube/config"]) {
            sh "kubectl set image deployment/portfolio-deployment portfolio=${IMAGE_NAME}:${BUILD_NUMBER} --record"
          }
        }
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline succeeded! Deployed version ${BUILD_NUMBER} to Kubernetes."
    }
    failure {
      echo "❌ Pipeline failed. Check logs for details."
    }
    always {
      echo "📋 Pipeline finished (success or fail)."
    }
  }
}
