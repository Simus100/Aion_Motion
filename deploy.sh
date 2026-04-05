#!/bin/bash

# Ensure the user has gcloud configured
if ! command -v gcloud &> /dev/null
then
    echo "gcloud command could not be found. Please install Google Cloud SDK."
    exit
fi

PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "No Google Cloud project configured. Please run 'gcloud config set project YOUR_PROJECT_ID'"
    exit
fi

SERVICE_NAME="remotion-render-service"
REGION="europe-west1" # Change this if you prefer another region

echo "Deploying $SERVICE_NAME to Google Cloud Run in region $REGION..."

# Submit the build to Cloud Build and deploy to Cloud Run
# We use max instances to prevent high costs, and allocate adequate memory for video rendering.
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 1 \
  --max-instances 5 \
  --timeout 300s

echo "Deployment complete! You can now send POST requests to your new service URL at the /render endpoint."
