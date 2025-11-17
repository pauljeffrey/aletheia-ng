# PowerShell script to fix dependency issues
# Run this script if you encounter build errors

Write-Host "Cleaning up dependencies..." -ForegroundColor Yellow

# Remove node_modules
if (Test-Path "node_modules") {
    Write-Host "Removing node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules
    Write-Host "✓ node_modules removed" -ForegroundColor Green
} else {
    Write-Host "node_modules not found, skipping..." -ForegroundColor Gray
}

# Remove package-lock.json
if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
    Remove-Item -Force package-lock.json
    Write-Host "✓ package-lock.json removed" -ForegroundColor Green
} else {
    Write-Host "package-lock.json not found, skipping..." -ForegroundColor Gray
}

# Remove .next cache
if (Test-Path ".next") {
    Write-Host "Removing .next cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
    Write-Host "✓ .next cache removed" -ForegroundColor Green
} else {
    Write-Host ".next cache not found, skipping..." -ForegroundColor Gray
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "✓ npm cache cleared" -ForegroundColor Green

# Reinstall dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    Write-Host "Try running: npm install --legacy-peer-deps" -ForegroundColor Yellow
}


