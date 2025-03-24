#!/bin/bash

# This script checks the status of an AWS Amplify Console build job
# Usage: ./check-amplify-build.sh <app-id> <branch-name> <job-id>

# Check if app ID, branch name, and job ID are provided
if [ $# -lt 3 ]; then
  echo "Usage: $0 <app-id> <branch-name> <job-id>"
  exit 1
fi

APP_ID=$1
BRANCH_NAME=$2
JOB_ID=$3

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

echo "Checking Amplify build status for job ID ${JOB_ID} on app ${APP_ID}, branch ${BRANCH_NAME}"

# Get job details
JOB_INFO=$(aws amplify get-job --app-id ${APP_ID} --branch-name ${BRANCH_NAME} --job-id ${JOB_ID})

if [ $? -ne 0 ]; then
  echo "Failed to get job information. Check your app ID, branch name, and job ID."
  exit 1
fi

# Extract and display job details
STATUS=$(echo $JOB_INFO | jq -r '.job.summary.status')
START_TIME=$(echo $JOB_INFO | jq -r '.job.summary.startTime')
END_TIME=$(echo $JOB_INFO | jq -r '.job.summary.endTime')
COMMIT_ID=$(echo $JOB_INFO | jq -r '.job.summary.commitId')
COMMIT_MESSAGE=$(echo $JOB_INFO | jq -r '.job.summary.commitMessage')

echo "Build Status: $STATUS"
echo "Start Time: $(date -d @$((START_TIME/1000)))"

if [ "$END_TIME" != "null" ]; then
  echo "End Time: $(date -d @$((END_TIME/1000)))"
  
  # Calculate duration
  DURATION=$((END_TIME - START_TIME))
  MINUTES=$((DURATION / 60000))
  SECONDS=$(((DURATION % 60000) / 1000))
  echo "Duration: ${MINUTES}m ${SECONDS}s"
fi

echo "Commit ID: $COMMIT_ID"
echo "Commit Message: $COMMIT_MESSAGE"

# Get build steps and their status
echo -e "\nBuild Steps:"
STEPS=$(echo $JOB_INFO | jq -r '.job.steps')
echo $STEPS | jq -r '.[] | "- \(.stepName): \(.status)"'

# If build failed, show the logs URL
if [ "$STATUS" == "FAILED" ]; then
  echo -e "\nBuild failed. Check the logs in the AWS Amplify Console:"
  echo "https://console.aws.amazon.com/amplify/home?region=${AWS_DEFAULT_REGION}#/${APP_ID}/branches/${BRANCH_NAME}/jobs/${JOB_ID}"
fi

