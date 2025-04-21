pipeline {
  agent any
  environment {
    IMAGE_NAME = "timor1/portfolio"
  }
  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/timorust/portfolio.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker_hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE_NAME:$BUILD_NUMBER'
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl set image deployment/portfolio-deployment portfolio=$IMAGE_NAME:$BUILD_NUMBER --record'
      }
    }
  }
}
