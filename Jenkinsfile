pipeline {
  agent any

  environment {
    IMAGE_NAME = "timor1/portfolio"
    VENV_PATH = "/var/lib/jenkins/.ansible-venv"
    KUBECONFIG = "/home/jenkins/.kube/config"
    ANSIBLE_COLLECTIONS_PATH = "/var/lib/jenkins/.ansible-venv/collections:/root/.ansible/collections"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/timorust/portfolio.git'
      }
    }

    stage('Run Ansible Playbook') {
      steps {
        script {
          // Check and create virtualenv
          if (!fileExists("${VENV_PATH}/bin/activate")) {
            echo "🔧 Creating virtual environment..."
            sh "python3 -m venv ${VENV_PATH}"
            sh "${VENV_PATH}/bin/pip install --upgrade pip"
            sh "${VENV_PATH}/bin/pip install ansible"
            sh "${VENV_PATH}/bin/ansible-galaxy collection install community.kubernetes"
          } else {
            echo "✅ Virtual environment already exists"
          }

          // Confirm ansible-playbook exists
          sh "ls ${VENV_PATH}/bin/ansible-playbook"

          // Run Ansible playbook with required env vars
          echo "🚀 Running Ansible playbook..."
          withEnv(["PATH=${VENV_PATH}/bin:$PATH", "ANSIBLE_COLLECTIONS_PATH=${ANSIBLE_COLLECTIONS_PATH}"]) {
            sh "ansible-playbook -i ansible/inventory.ini ansible/site.yml"
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker_hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            sh """
              echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
              docker push ${IMAGE_NAME}:${BUILD_NUMBER}
            """
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          withEnv(["KUBECONFIG=${KUBECONFIG}"]) {
            sh "kubectl set image deployment/portfolio-deployment portfolio=${IMAGE_NAME}:${BUILD_NUMBER} --record"
          }
        }
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline succeeded! Deployed version $BUILD_NUMBER to Kubernetes."
    }
    failure {
      echo "❌ Pipeline failed. Check logs for details."
    }
    always {
      echo "📋 Pipeline finished (success or fail)."
    }
  }
}
