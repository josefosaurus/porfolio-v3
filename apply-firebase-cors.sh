#!/bin/bash

# Script to apply CORS configuration to Firebase Storage
# Requires Google Cloud SDK (gcloud) to be installed

BUCKET_NAME="portfolio-34f1d.firebasestorage.app"

echo "Applying CORS configuration to Firebase Storage bucket: $BUCKET_NAME"
echo ""

# Check if gsutil is installed
if ! command -v gsutil &> /dev/null; then
    echo "❌ gsutil is not installed."
    echo ""
    echo "Please install Google Cloud SDK:"
    echo "  brew install --cask google-cloud-sdk"
    echo ""
    echo "Or download from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Apply CORS configuration
echo "Applying CORS policy..."
gsutil cors set firebase-storage-cors.json gs://$BUCKET_NAME

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ CORS configuration applied successfully!"
    echo ""
    echo "Verifying CORS configuration..."
    gsutil cors get gs://$BUCKET_NAME
else
    echo ""
    echo "❌ Failed to apply CORS configuration"
    echo ""
    echo "Make sure you're authenticated:"
    echo "  gcloud auth login"
fi
