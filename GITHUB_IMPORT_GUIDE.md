# GitHub Import Guide

Your React Jigsaw component is now ready to be imported from GitHub! Here's everything you need to know.

## What We've Set Up

1. **Package Configuration**: Updated `package.json` with proper entry points and exports
2. **Build System**: Configured Vite to build the library with both ESM and CommonJS formats
3. **TypeScript Support**: Generated TypeScript declaration files
4. **CSS Support**: Built CSS files are included and can be imported separately
5. **Documentation**: Comprehensive README and usage examples

## How to Use from GitHub

### Installation

```bash
npm install github:yourusername/react-jigsaw
```

### Basic Usage

```tsx
import React from 'react';
import { Puzzle } from 'react-jigsaw';

function App() {
  return (
    <Puzzle
      image="https://picsum.photos/400/500"
      onComplete={() => console.log('Puzzle completed!')}
    />
  );
}
```

### Advanced Usage

```tsx
import React from 'react';
import { Puzzle } from 'react-jigsaw';

function App() {
  const customOptions = {
    board: {
      columns: 6,
      rows: 4,
      width: 600,
      height: 400,
    },
    puzzle: {
      timer: {
        enabled: true,
      },
      refreshButton: {
        enabled: true,
      },
    },
  };

  return (
    <Puzzle
      image="https://picsum.photos/600/400"
      options={customOptions}
      onComplete={() => console.log('Done!')}
    />
  );
}
```

### Importing Styles (Optional)

```tsx
import 'react-jigsaw/styles';
```

## Files Created/Modified

### Core Files

- `package.json` - Updated with proper exports and entry points
- `src/index.tsx` - Main entry point that exports the component
- `vite.config.ts` - Configured for library building
- `tsconfig.json` - Updated to exclude test files from builds

### Build Output

- `dist/index.esm.js` - ES Module format
- `dist/index.cjs.js` - CommonJS format
- `dist/index.d.ts` - TypeScript declarations
- `dist/react-jigsaw.css` - Compiled styles

### Documentation

- `README.md` - Comprehensive documentation
- `example-usage.md` - Usage examples
- `GITHUB_IMPORT_GUIDE.md` - This guide

## Next Steps

1. **Update Repository URL**: Replace `yourusername` in `package.json` with your actual GitHub username
2. **Commit and Push**: Commit all changes and push to GitHub
3. **Test Installation**: Try installing from your GitHub repository in a test project
4. **Publish to npm** (Optional): If you want to publish to npm later, you can use `npm publish`

## Testing the Installation

Create a test project to verify the GitHub import works:

```bash
mkdir test-jigsaw-import
cd test-jigsaw-import
npm init -y
npm install react react-dom
npm install github:yourusername/react-jigsaw
```

Then create a simple test:

```tsx
// test.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Puzzle } from 'react-jigsaw';

function App() {
  return (
    <Puzzle
      image="https://picsum.photos/400/500"
      onComplete={() => console.log('Test completed!')}
    />
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

## Troubleshooting

### Common Issues

1. **Module not found**: Make sure you're using the correct GitHub URL
2. **TypeScript errors**: The component includes full TypeScript support
3. **CSS not loading**: Import styles separately with `import 'react-jigsaw/styles'`
4. **Build errors**: Make sure to run `npm run build` before pushing to GitHub

### Build Commands

```bash
# Build the library
npm run build

# Generate TypeScript declarations
npm run build:types

# Run tests
npm test

# Start demo
npm run demo
```

## Features Available

- ✅ Drag and drop puzzle pieces
- ✅ Snap to grid functionality
- ✅ Keyboard navigation
- ✅ Customizable board size
- ✅ Timer (optional)
- ✅ Refresh button (optional)
- ✅ Row/column controls (optional)
- ✅ Responsive design
- ✅ TypeScript support
- ✅ CSS customization

Your React Jigsaw component is now ready for GitHub imports! 🎉
