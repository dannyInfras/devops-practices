#!/bin/bash

# This script installs and configures a GitLab Runner on an EC2 instance
# Prerequisites: Ubuntu 20.04 or later

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker
sudo systemctl start docker

# Add current user to docker group
sudo usermod -aG docker $USER

# Install GitLab Runner
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt-get install gitlab-runner

# Register the GitLab Runner
# You'll need to provide:
# - GitLab instance URL (e.g., https://gitlab.com/)
# - Registration token (from GitLab Admin area or project settings)
# - Description (e.g., "AWS EC2 Runner")
# - Tags (e.g., "aws,amplify")
# - Executor (use "docker")
# - Default Docker image (e.g., "alpine:latest")

echo "Now register your GitLab Runner with the following command:"
echo "sudo gitlab-runner register"

# Configure GitLab Runner to use Docker
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start

echo "GitLab Runner installation complete!"
echo "Make sure to configure AWS credentials in GitLab CI/CD variables."

