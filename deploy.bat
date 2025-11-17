@echo off
REM Deployment script for Modal workspaces (Windows)
REM Usage: deploy.bat [workspace] [model-type]
REM workspace: naijaai, pauljeffrey, model-host (default: naijaai)
REM model-type: pretrained, capable, all (default: all)

set WORKSPACE=%1
if "%WORKSPACE%"=="" set WORKSPACE=naijaai

set MODEL_TYPE=%2
if "%MODEL_TYPE%"=="" set MODEL_TYPE=all

echo Deploying to workspace: %WORKSPACE%
echo Model type: %MODEL_TYPE%

REM Switch workspace
modal workspace set %WORKSPACE%

REM Check if workspace switch was successful
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to switch workspace. Make sure you have access to %WORKSPACE% workspace.
    exit /b 1
)

REM Deploy based on model type
if "%MODEL_TYPE%"=="pretrained" goto deploy_pretrained
if "%MODEL_TYPE%"=="capable" goto deploy_capable
if "%MODEL_TYPE%"=="all" goto deploy_all

:deploy_all
echo Deploying pretrained models...
modal deploy modal/pretrained_model.py
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to deploy pretrained models
    exit /b 1
)

:deploy_capable
echo Deploying capable models...
modal deploy modal/capable_model.py
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to deploy capable models
    exit /b 1
)
goto end

:deploy_pretrained
echo Deploying pretrained models...
modal deploy modal/pretrained_model.py
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to deploy pretrained models
    exit /b 1
)
goto end

:end
echo Deployment completed successfully!
echo Current workspace: %WORKSPACE%
modal workspace current

