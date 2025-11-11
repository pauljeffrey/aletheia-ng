#!/bin/bash
# Bash script to fix dependency issues
# Run this script if you encounter build errors

echo "Cleaning up dependencies..."

# Remove node_modules
if [ -d "node_modules" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules
    echo "✓ node_modules removed"
else
    echo "node_modules not found, skipping..."
fi

# Remove package-lock.json
if [ -f "package-lock.json" ]; then
    echo "Removing package-lock.json..."
    rm -f package-lock.json
    echo "✓ package-lock.json removed"
else
    echo "package-lock.json not found, skipping..."
fi

# Remove .next cache
if [ -d ".next" ]; then
    echo "Removing .next cache..."
    rm -rf .next
    echo "✓ .next cache removed"
else
    echo ".next cache not found, skipping..."
fi

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force
echo "✓ npm cache cleared"

# Reinstall dependencies
echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully!"
    echo ""
    echo "You can now run: npm run dev"
else
    echo "✗ Failed to install dependencies"
    echo "Try running: npm install --legacy-peer-deps"
fi


