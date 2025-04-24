pipeline {
  agent any

  environment {
    IMAGE_NAME = "timor1/portfolio"
    VENV_PATH = "/var/lib/jenkins/.ansible-venv"
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
          // Create virtual environment if it doesn't exist
          if (!fileExists(VENV_PATH)) {
            echo "🔧 Creating virtual environment..."
            sh "python3 -m venv ${VENV_PATH}"
            sh "${VENV_PATH}/bin/pip install --upgrade pip"
            sh "${VENV_PATH}/bin/pip install ansible"
          } else {
            echo "✅ Virtual environment already exists"
          }

          // Make sure ansible-playbook exists in the venv
          sh "ls ${VENV_PATH}/bin/ansible-playbook"
          
          // Run the ansible playbook
          echo "🚀 Running Ansible playbook..."
          sh "${VENV_PATH}/bin/ansible-playbook -i ansible/inventory.ini ansible/site.yml"
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
          sh "kubectl set image deployment/portfolio-deployment portfolio=$IMAGE_NAME:$BUILD_NUMBER --record"
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
