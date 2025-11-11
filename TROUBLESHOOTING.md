# Troubleshooting Guide

## Build Error: Unterminated string in JSON (csso/mdn-data)

If you encounter this error:
```
SyntaxError: ...node_modules\csso\node_modules\mdn-data\css\syntaxes.json: Unterminated string in JSON
```

This is typically caused by corrupted `node_modules`. Here's how to fix it:

### Solution 1: Clean Reinstall (Recommended)

1. **Delete node_modules and lock files:**
   ```bash
   # Windows (PowerShell)
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   
   # Mac/Linux
   rm -rf node_modules
   rm -f package-lock.json
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Reinstall dependencies:**
   ```bash
   npm install
   ```

4. **Try building again:**
   ```bash
   npm run dev
   ```

### Solution 2: Update Dependencies

If Solution 1 doesn't work, try updating your dependencies:

```bash
npm update
```

### Solution 3: Use Yarn Instead

Sometimes using Yarn instead of npm can resolve dependency issues:

```bash
# Install Yarn (if not already installed)
npm install -g yarn

# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Install with Yarn
yarn install

# Run dev server
yarn dev
```

### Solution 4: Fix SVG Import Issues

If you're still having issues with SVG imports, we've already converted all SVG imports to React components. The icons are now in `src/components/icons/`:

- `ArrowRight` - Arrow right icon
- `MenuIcon` - Menu/hamburger icon

These are imported as React components instead of SVG files, which avoids webpack SVG loader issues.

### Verification

After applying the fix, verify everything works:

```bash
# Check if dev server starts
npm run dev

# Check if build works
npm run build
```

## Other Common Issues

### Port Already in Use

If port 3000 is already in use:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill
```

### Module Not Found Errors

If you get module not found errors:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. If using TypeScript, restart your IDE/editor

### Build Errors

If you encounter build errors:

1. Clear Next.js cache:
   ```bash
   Remove-Item -Recurse -Force .next
   ```

2. Clear node_modules and reinstall:
   ```bash
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

3. Try building again:
   ```bash
   npm run build
   ```

## Still Having Issues?

If you're still experiencing issues:

1. Check Node.js version (should be 16.0.0 or higher):
   ```bash
   node --version
   ```

2. Check npm version:
   ```bash
   npm --version
   ```

3. Try using a different Node.js version manager (nvm, fnm, etc.)

4. Check for any conflicting global packages

5. Open an issue on GitHub with:
   - Node.js version
   - npm version
   - Full error message
   - Steps to reproduce


