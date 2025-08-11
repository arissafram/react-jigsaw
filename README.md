# React Jigsaw

A React component for creating interactive jigsaw puzzles with customizable options and smooth drag-and-drop functionality.

## Installation

### From GitHub (Recommended)

You can install this component directly from GitHub:

```bash
npm install github:arissafram/react-jigsaw
```

```bash
yarn add github:arissafram/react-jigsaw
```

## Usage

### Basic Usage

```tsx
import { Puzzle } from 'react-jigsaw';

function App() {
  const handleComplete = () => {
    console.log('Puzzle completed!');
  };

  return <Puzzle image="/path/to/your/image.jpg" onComplete={handleComplete} />;
}
```

### Advanced Usage with Custom Options

```tsx
import { Puzzle, DEFAULT_PUZZLE_OPTIONS } from 'react-jigsaw';

function App() {
  const customOptions = {
    board: {
      className: 'custom-board',
      columns: 6,
      height: 400,
      outlineStrokeColor: '#bbb',
      rows: 4,
      scatterArea: 100,
      showBoardSlotOutlines: true,
      snapThreshold: 15,
      width: 600,
    },
    puzzle: {
      className: 'custom-puzzle',
      responsive: true,
      timer: {
        className: 'custom-timer',
        enabled: true,
      },
      refreshButton: {
        className: 'custom-refresh-btn',
        enabled: true,
      },
      rowsAndColumns: {
        className: 'custom-controls',
        enabled: true,
      },
    },
    puzzlePiece: {
      strokeColor: '#ff6b6b',
      strokeEnabled: true,
    },
  };

  return (
    <Puzzle
      image="/path/to/your/image.jpg"
      options={customOptions}
      onComplete={() => console.log('puzzle completed')}
      onRefresh={() => console.log('puzzle refreshed')}
    />
  );
}
```

### Importing Styles (Optional)

If you want to import the default styles:

```tsx
import 'react-jigsaw/styles';
```

### TypeScript Support

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
      onComplete={() => console.log('done')}
    />
  );
}
```

## Props

### Global Options

| Prop         | Type                   | Default                  | Description                             |
| ------------ | ---------------------- | ------------------------ | --------------------------------------- |
| `image`      | `string`               | **required**             | URL or path to the image for the puzzle |
| `onComplete` | `() => void`           | `() => {}`               | Callback when puzzle is completed       |
| `onRefresh`  | `() => void`           | `() => {}`               | Callback when puzzle is refreshed       |
| `options`    | `InitialPuzzleOptions` | `DEFAULT_PUZZLE_OPTIONS` | Configuration options for the puzzle    |

### Board Options

| Option                  | Type      | Default  | Description                                  |
| ----------------------- | --------- | -------- | -------------------------------------------- |
| `className`             | `string`  | `''`     | CSS class for the board                      |
| `columns`               | `number`  | `3`      | Number of columns in the puzzle              |
| `height`                | `number`  | `500`    | Height of the puzzle board                   |
| `outlineStrokeColor`    | `string`  | `'#000'` | Stroke color for board outlines              |
| `rows`                  | `number`  | `4`      | Number of rows in the puzzle                 |
| `scatterArea`           | `number`  | `0`      | Area around board where pieces are scattered |
| `showBoardSlotOutlines` | `boolean` | `true`   | Show outlines of board slots                 |
| `snapThreshold`         | `number`  | `20`     | Distance threshold for snapping pieces       |
| `width`                 | `number`  | `400`    | Width of the puzzle board                    |

### Puzzle Options

| Option                     | Type      | Default | Description                        |
| -------------------------- | --------- | ------- | ---------------------------------- |
| `className`                | `string`  | `''`    | CSS class for the puzzle container |
| `refreshButton.enabled`    | `boolean` | `true`  | Enable refresh button              |
| `refreshButton.className`  | `string`  | `''`    | CSS class for the refresh button   |
| `responsive`               | `boolean` | `true`  | Enable responsive behavior         |
| `rowsAndColumns.enabled`   | `boolean` | `false` | Enable rows/columns controls       |
| `rowsAndColumns.className` | `string`  | `''`    | CSS class for the controls         |
| `timer.enabled`            | `boolean` | `true`  | Enable timer functionality         |
| `timer.className`          | `string`  | `''`    | CSS class for the timer            |

### Puzzle Piece Options

| Option          | Type      | Default  | Description           |
| --------------- | --------- | -------- | --------------------- |
| `strokeColor`   | `string`  | `'gold'` | Color of piece stroke |
| `strokeEnabled` | `boolean` | `true`   | Enable piece stroke   |

## Features

- **Drag and Drop**: Smooth drag-and-drop functionality for puzzle pieces
- **Snap to Grid**: Pieces automatically snap to correct positions
- **Keyboard Navigation**: Full keyboard accessibility support
- **Mobile Support**: Full drag and drop across iOS and Android
- **Responsive Design**: Optional responsive behavior
- **Customizable**: Extensive customization options
- **Timer**: Optional built-in timer
- **Refresh**: Optional refresh button to restart puzzle
- **Row/Column Controls**: Optional controls to adjust puzzle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)g
- Edge (latest)

## Local development

### Prerequisites

- Node.js 18+
- npm or yarn

### Local development

1. Clone the repository:

```bash
git clone [repo]
cd react-jigsaw
```

2. Install dependencies:

```bash
npm install
```

3. Start the demo:

```bash
npm run demo
```

4. Run tests:

```bash
npm test
```

### Building

To build the library:

```bash
npm run build
```

This will create the distribution files in the `dist` directory.
