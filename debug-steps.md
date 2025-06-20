# 🐛 Debug Steps for Runtime Error

## Error: `chunk-6Q5IT3YL.js?v=aed7c1a3:21609`

This is a runtime JavaScript error in the bundled code. Here's how to debug it:

### 1. Get Detailed Error Information

**Open Browser DevTools:**
1. Press F12 or right-click → Inspect
2. Go to Console tab
3. Refresh the page (Ctrl/Cmd + R)
4. Look for red error messages
5. Click on the error to see the stack trace

### 2. Common Causes & Solutions

#### A. TypeScript Strict Mode Issues
```bash
# Check if there are type errors
npm run build 2>&1 | grep "error"
```

#### B. Environment Variables Missing
```bash
# Check if .env is loaded
echo $VITE_API_BASE_URL
```

#### C. API Connection Issues
```bash
# Test if backend is running
curl http://localhost:3001/api/health
```

#### D. Image Loading Issues
```bash
# Check if images are accessible
curl -I http://localhost:8081/images/projects/logo1.png
```

### 3. Quick Fixes to Try

#### Fix 1: Clear Vite Cache
```bash
rm -rf node_modules/.vite
npm run dev
```

#### Fix 2: Rebuild Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Fix 3: Check Source Maps
Add to vite.config.ts:
```ts
export default defineConfig({
  build: {
    sourcemap: true  // Enable source maps for debugging
  }
})
```

#### Fix 4: Disable Strict Mode Temporarily
In tsconfig.json:
```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

### 4. Advanced Debugging

#### Enable Verbose Logging
Add to src/main.tsx:
```tsx
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});
```

#### Check Network Tab
1. Open DevTools → Network tab
2. Refresh page
3. Look for failed requests (red entries)
4. Check if all chunks load successfully

### 5. Most Likely Issues Based on Recent Changes

1. **TypeScript strict mode** - May have introduced type errors
2. **Image imports** - Logo path changes
3. **Environment variables** - Missing VITE_ prefix
4. **Animation performance** - Hero component optimizations
5. **API endpoints** - Backend validation changes

### 6. Immediate Debug Command

Run this to get more info:
```bash
# Start with source maps enabled
NODE_ENV=development npm run dev
```

Then check browser console for the actual error message.