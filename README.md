# GitLab CI/CD Pipeline for AWS Amplify

This repository contains configuration files and scripts to set up a CI/CD pipeline using GitLab Runner that triggers AWS Amplify Console build jobs.

## Prerequisites

- GitLab account and repository
- AWS account with Amplify Console app set up
- IAM user with appropriate permissions for Amplify
- Server or EC2 instance to host GitLab Runner

## Setup Instructions

### 1. Configure AWS IAM Permissions

Create an IAM user with the following permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "amplify:StartJob",
                "amplify:GetJob",
                "amplify:ListJobs",
                "amplify:StopJob"
            ],
            "Resource": "arn:aws:amplify:*:*:apps/*/branches/*/jobs/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "amplify:GetBranch",
                "amplify:ListBranches"
            ],
            "Resource": "arn:aws:amplify:*:*:apps/*/branches/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "amplify:GetApp",
                "amplify:ListApps"
            ],
            "Resource": "arn:aws:amplify:*:*:apps/*"
        }
    ]
}

