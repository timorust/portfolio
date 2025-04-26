# 🚀 Final DevOps Project: Portfolio CI/CD, Automation, and Monitoring

## 📋 Project Overview

This project showcases a complete DevOps workflow for deploying and monitoring a static portfolio website using modern DevOps practices and tools.  
The solution includes building a CI/CD pipeline with Jenkins, containerizing the application with Docker, deploying it with Kubernetes (K3s), automating infrastructure with Ansible, and setting up real-time monitoring using Prometheus and Grafana.

---

## ⚙️ Stack and Tools Used

- **Jenkins** – CI/CD automation
- **Docker** – Application containerization
- **Docker Hub** – Image repository
- **Kubernetes (K3s)** – Lightweight Kubernetes orchestration
- **Ansible** – Infrastructure as Code (IaC) and automation
- **Prometheus** – Monitoring system
- **Grafana** – Visualization and alerting
- **GitHub** – Version control and repository management

---

## 🛠️ Setup and Workflow

### 1. Setting Up Jenkins
- Installed Jenkins on the control server.
- Configured necessary plugins (Docker, Kubernetes CLI, Git).
- Prepared Python Virtual Environment for Ansible inside Jenkins:
  - Installed `ansible` and `kubernetes` Python modules.

### 2. Ansible Automation
- Created Ansible playbooks:
  - **Install Docker** on nodes.
  - **Install K3s** Kubernetes lightweight cluster.
  - **Deploy the Portfolio Application** automatically.

### 3. Dockerization
- Created a `Dockerfile` for the static portfolio website.
- Built Docker images inside the Jenkins pipeline.
- Pushed images automatically to Docker Hub using Jenkins credentials.

### 4. Kubernetes Deployment
- Wrote Kubernetes manifests for the application:
  - **Deployment** and **Service** YAML files for the portfolio.
- Used `kubectl` to apply changes and update deployments:
  - Rolled out new Docker image versions seamlessly.

### 5. Monitoring Setup
- Deployed **Prometheus** and **Grafana** on K3s cluster using YAML manifests.
- Exposed services via **NodePort** to enable external access:
  - Prometheus on port `30090`
  - Grafana on port `30030`
- Verified that Grafana dashboards show real-time metrics from Prometheus.

---

## 🔗 Important URLs

| Service          | URL                           |
|------------------|-------------------------------|
| Portfolio Site   | `http://<node-ip>:30001`        |
| Prometheus UI    | `http://<node-ip>:30090`        |
| Grafana Dashboard| `http://<node-ip>:30030`        |

> Replace `<node-ip>` with your server’s external IP address.

---

## ✅ Current Achievements

- Full automation from code push to production deployment.
- Docker-based lightweight application packaging.
- Real-time monitoring and visualization of application and cluster performance.
- Infrastructure fully provisioned and managed with Ansible.

---

## 📈 Next Steps (Coming Soon)

- Automate cloud infrastructure provisioning with **Terraform** and deploy the application to **AWS**.

---

# 🚀 Ready for production!

