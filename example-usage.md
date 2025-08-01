# Example Usage

This file shows how to use the React Jigsaw component when imported from GitHub.

## Installation

```bash
npm install github:yourusername/react-jigsaw
```

## Basic Usage

```tsx
import React from 'react';
import { Puzzle } from 'react-jigsaw';

function App() {
  const handleComplete = () => {
    console.log('Puzzle completed!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Jigsaw Puzzle</h1>
      <Puzzle image="https://picsum.photos/400/500" onComplete={handleComplete} />
    </div>
  );
}

export default App;
```

## Advanced Usage

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
      snapThreshold: 15,
      scatterArea: 100,
      showBoardSlotOutlines: true,
    },
    puzzle: {
      responsive: true,
      timer: {
        enabled: true,
        className: 'custom-timer',
      },
      refreshButton: {
        enabled: true,
        className: 'custom-refresh-btn',
      },
      rowsAndColumns: {
        enabled: true,
        className: 'custom-controls',
      },
    },
    puzzlePiece: {
      strokeColor: '#ff6b6b',
      strokeEnabled: true,
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custom Jigsaw Puzzle</h1>
      <Puzzle
        image="https://picsum.photos/600/400"
        options={customOptions}
        onComplete={() => console.log('Puzzle completed!')}
        onRefresh={() => console.log('Puzzle refreshed!')}
        responsive={true}
      />
    </div>
  );
}

export default App;
```

## Importing Styles (Optional)

If you want to import the default styles:

```tsx
import 'react-jigsaw/styles';
```

## TypeScript Support

The component includes full TypeScript support:

```tsx
import React from 'react';
import { Puzzle, InitialPuzzleOptions } from 'react-jigsaw';

function App() {
  const options: InitialPuzzleOptions = {
    board: {
      columns: 5,
      rows: 3,
    },
    puzzle: {
      timer: {
        enabled: true,
      },
    },
  };

  return (
    <Puzzle
      image="https://picsum.photos/400/300"
      options={options}
      onComplete={() => console.log('Done!')}
    />
  );
}
```
