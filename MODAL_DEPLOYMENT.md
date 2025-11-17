# Modal Deployment Guide

This guide explains how to deploy SabiYarn models to Modal workspaces and switch between different workspaces.

## Prerequisites

1. Install Modal:
```bash
pip install modal
```

2. Authenticate with Modal:
```bash
modal token new
```

3. Set up Modal workspaces:
   - `naijaai`
   - `pauljeffrey`
   - `model-host`

## Workspace Setup

### Switching Between Workspaces

Modal uses workspace switching via the `modal workspace` command or environment variables.

#### Method 1: Using Modal CLI

```bash
# Switch to naijaai workspace
modal workspace set naijaai

# Switch to pauljeffrey workspace
modal workspace set pauljeffrey

# Switch to model-host workspace
modal workspace set model-host

# Check current workspace
modal workspace current
```

#### Method 2: Using Environment Variables

```bash
# For naijaai workspace
export MODAL_WORKSPACE=naijaai

# For pauljeffrey workspace
export MODAL_WORKSPACE=pauljeffrey

# For model-host workspace
export MODAL_WORKSPACE=model-host
```

#### Method 3: Using Modal Config File

Create a `modal.toml` file in your project root:

```toml
[workspace]
name = "naijaai"  # Change to desired workspace
```

## Deployment

### Deploying Pretrained Models

1. Navigate to the modal directory:
```bash
cd modal
```

2. Switch to the desired workspace:
```bash
modal workspace set naijaai  # or pauljeffrey, model-host
```

3. Deploy the pretrained model:
```bash
modal deploy pretrained_model.py
```

4. The deployment will provide you with a URL like:
   - `https://naijaai--sabiyarn-fastapi-app.modal.run/predict`
   - `https://pauljeffrey--sabiyarn-fastapi-app.modal.run/predict`
   - `https://model-host--sabiyarn-fastapi-app.modal.run/predict`

### Supported Models

The pretrained model script supports the following models:
- `sabiyarn-125m`: BeardedMonster/SabiYarn-125M
- `sabiyarn-finetune`: BeardedMonster/SabiYarn-125M-finetune
- `sabiyarn-translate`: BeardedMonster/SabiYarn-125M-translate
- `sabiyarn-sentiment`: BeardedMonster/SabiYarn-125M-sentiment
- `sabiyarn-topic`: BeardedMonster/SabiYarn-125M-topic
- `sabiyarn-diacritize`: BeardedMonster/SabiYarn-diacritics-cleaner
- `sabiyarn-igbo-translate`: BeardedMonster/SabiYarn-125M-Igbo-translate
- `sabiyarn-yoruba-translate`: BeardedMonster/SabiYarn-125M-Yoruba-translate
- `sabiyarn-language-detection`: BeardedMonster/Sabiyarn_language_detection

### Deploying Capable Models

1. Switch to the desired workspace:
```bash
modal workspace set naijaai  # or pauljeffrey, model-host
```

2. Deploy the capable model:
```bash
modal deploy capable_model.py
```

3. The deployment will provide you with a URL like:
   - `https://naijaai--sabiyarn-capable.modal.run/predict`
   - `https://pauljeffrey--sabiyarn-capable.modal.run/predict`
   - `https://model-host--sabiyarn-capable.modal.run/predict`

## Deployment Scripts

### Quick Deploy Script

Create a deployment script for easier workspace switching:

#### Windows (deploy.bat)

```batch
@echo off
set WORKSPACE=%1
if "%WORKSPACE%"=="" set WORKSPACE=naijaai

echo Deploying to workspace: %WORKSPACE%
modal workspace set %WORKSPACE%
modal deploy modal/pretrained_model.py
modal deploy modal/capable_model.py
```

#### Linux/Mac (deploy.sh)

```bash
#!/bin/bash
WORKSPACE=${1:-naijaai}

echo "Deploying to workspace: $WORKSPACE"
modal workspace set $WORKSPACE
modal deploy modal/pretrained_model.py
modal deploy modal/capable_model.py
```

Usage:
```bash
# Deploy to naijaai (default)
./deploy.sh

# Deploy to pauljeffrey
./deploy.sh pauljeffrey

# Deploy to model-host
./deploy.sh model-host
```

## Updating API URLs

After deployment, update the API URLs in your Next.js application:

1. **Pretrained Models API** (`src/app/api/models/pretrained/route.ts`):
   - Update the `API_URLS` array with your deployed URLs

2. **Capable Models API** (`src/app/api/models/capable/route.ts`):
   - Update the `API_URLS` array with your deployed URLs

## Monitoring

Monitor your deployments using Modal dashboard:
```bash
modal app list
```

View logs:
```bash
modal app logs sabiyarn-fastapi-app
modal app logs sabiyarn-capable
```

## Troubleshooting

### Workspace Not Found
If you get a workspace not found error:
1. Verify you have access to the workspace
2. Check workspace name spelling
3. Ensure you're authenticated: `modal token new`

### Deployment Fails
1. Check Modal logs: `modal app logs <app-name>`
2. Verify model repository paths are correct
3. Ensure GPU resources are available
4. Check API endpoint URLs are accessible

### Model Loading Issues
1. Verify Hugging Face model repository names
2. Check model access permissions
3. Ensure sufficient GPU memory

## Environment Variables

You can set environment variables in Modal for different configurations:

```python
# In your Modal script
stub = modal.Stub(
    "sabiyarn-fastapi-app",
    secrets=[
        modal.Secret.from_name("huggingface-secret"),  # For private models
    ]
)
```

## Cost Optimization

- Use `container_idle_timeout` to reduce costs
- Set appropriate GPU types based on model size
- Monitor usage through Modal dashboard
- Use spot instances for development

## Best Practices

1. **Version Control**: Tag your deployments with version numbers
2. **Testing**: Test deployments in a development workspace first
3. **Monitoring**: Set up alerts for deployment failures
4. **Scaling**: Configure autoscaling based on traffic
5. **Security**: Use secrets for API keys and credentials

## Support

For issues with Modal deployment:
- Modal Documentation: https://modal.com/docs
- Modal Discord: https://discord.gg/modal
- Check Modal status: https://status.modal.com

