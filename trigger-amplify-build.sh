#!/bin/bash

# This script triggers an AWS Amplify Console build job via AWS CLI
# Usage: ./trigger-amplify-build.sh <app-id> <branch-name>

# Check if app ID and branch name are provided
if [ $# -lt 2 ]; then
  echo "Usage: $0 <app-id> <branch-name>"
  exit 1
fi

APP_ID=$1
BRANCH_NAME=$2

# Ensure AWS CLI is installed
if ! command -v aws &> /dev/null; then
  echo "AWS CLI is not installed. Please install it first."
  exit 1
fi

# Ensure AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
  echo "AWS credentials are not configured. Please run 'aws configure' first."
  exit 1
fi

echo "Triggering Amplify build for app ID ${APP_ID} on branch ${BRANCH_NAME}"

# Start the build job
BUILD_ID=$(aws amplify start-job --app-id ${APP_ID} --branch-name ${BRANCH_NAME} --job-type RELEASE --output json | jq -r '.jobSummary.jobId')

if [ -z "$BUILD_ID" ] || [ "$BUILD_ID" == "null" ]; then
  echo "Failed to start build job. Check your app ID and branch name."
  exit 1
fi

echo "Started Amplify build job with ID: ${BUILD_ID}"

# Ask if user wants to wait for the build to complete
read -p "Do you want to wait for the build to complete? (y/n): " WAIT_RESPONSE

if [[ "$WAIT_RESPONSE" =~ ^[Yy]$ ]]; then
  echo "Waiting for build to complete..."
  STATUS="PENDING"
  while [ "$STATUS" == "PENDING" ] || [ "$STATUS" == "RUNNING" ]; do
    sleep 30
    JOB_INFO=$(aws amplify get-job --app-id ${APP_ID} --branch-name ${BRANCH_NAME} --job-id ${BUILD_ID})
    STATUS=$(echo $JOB_INFO | jq -r '.job.summary.status')
    echo "Current build status: $STATUS"
  done
  
  if [ "$STATUS" == "SUCCEED" ]; then
    echo "Build completed successfully!"
  else
    echo "Build failed with status: $STATUS"
    exit 1
  fi
else
  echo "Build triggered. You can check the status in the AWS Amplify Console."
fi

