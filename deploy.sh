#!/bin/bash

# Deployment script for Modal workspaces
# Usage: ./deploy.sh [workspace] [model-type]
# workspace: naijaai, pauljeffrey, model-host (default: naijaai)
# model-type: pretrained, capable, all (default: all)

WORKSPACE=${1:-naijaai}
MODEL_TYPE=${2:-all}

echo "Deploying to workspace: $WORKSPACE"
echo "Model type: $MODEL_TYPE"

# Switch workspace
modal workspace set $WORKSPACE

# Check if workspace switch was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to switch workspace. Make sure you have access to $WORKSPACE workspace."
    exit 1
fi

# Deploy based on model type
if [ "$MODEL_TYPE" == "pretrained" ] || [ "$MODEL_TYPE" == "all" ]; then
    echo "Deploying pretrained models..."
    modal deploy modal/pretrained_model.py
    if [ $? -ne 0 ]; then
        echo "Error: Failed to deploy pretrained models"
        exit 1
    fi
fi

if [ "$MODEL_TYPE" == "capable" ] || [ "$MODEL_TYPE" == "all" ]; then
    echo "Deploying capable models..."
    modal deploy modal/capable_model.py
    if [ $? -ne 0 ]; then
        echo "Error: Failed to deploy capable models"
        exit 1
    fi
fi

echo "Deployment completed successfully!"
echo "Current workspace: $WORKSPACE"
modal workspace current

