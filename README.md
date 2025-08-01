# React Jigsaw

A React component for creating interactive jigsaw puzzles with customizable options and smooth drag-and-drop functionality.

## Installation

### From GitHub (Recommended)

You can install this component directly from GitHub:

```bash
npm install github:yourusername/react-jigsaw
```

Or using yarn:

```bash
yarn add github:yourusername/react-jigsaw
```

### From npm (when published)

```bash
npm install react-jigsaw
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
    <Puzzle
      image="/path/to/your/image.jpg"
      options={customOptions}
      onComplete={() => console.log('Puzzle completed!')}
      onRefresh={() => console.log('Puzzle refreshed!')}
      responsive={true}
    />
  );
}
```

## Props

### Puzzle Component Props

| Prop         | Type                   | Default                  | Description                             |
| ------------ | ---------------------- | ------------------------ | --------------------------------------- |
| `image`      | `string`               | **required**             | URL or path to the image for the puzzle |
| `options`    | `InitialPuzzleOptions` | `DEFAULT_PUZZLE_OPTIONS` | Configuration options for the puzzle    |
| `onComplete` | `() => void`           | `undefined`              | Callback when puzzle is completed       |
| `onRefresh`  | `() => void`           | `undefined`              | Callback when puzzle is refreshed       |
| `responsive` | `boolean`              | `false`                  | Enable responsive behavior              |

### Board Options

| Option                  | Type      | Default | Description                                  |
| ----------------------- | --------- | ------- | -------------------------------------------- |
| `columns`               | `number`  | `4`     | Number of columns in the puzzle              |
| `rows`                  | `number`  | `5`     | Number of rows in the puzzle                 |
| `width`                 | `number`  | `400`   | Width of the puzzle board                    |
| `height`                | `number`  | `500`   | Height of the puzzle board                   |
| `snapThreshold`         | `number`  | `20`    | Distance threshold for snapping pieces       |
| `scatterArea`           | `number`  | `0`     | Area around board where pieces are scattered |
| `showBoardSlotOutlines` | `boolean` | `true`  | Show outlines of board slots                 |
| `className`             | `string`  | `''`    | CSS class for the board                      |

### Puzzle Options

| Option                     | Type      | Default | Description                        |
| -------------------------- | --------- | ------- | ---------------------------------- |
| `responsive`               | `boolean` | `false` | Enable responsive behavior         |
| `className`                | `string`  | `''`    | CSS class for the puzzle container |
| `timer.enabled`            | `boolean` | `false` | Enable timer functionality         |
| `timer.className`          | `string`  | `''`    | CSS class for the timer            |
| `refreshButton.enabled`    | `boolean` | `false` | Enable refresh button              |
| `refreshButton.className`  | `string`  | `''`    | CSS class for the refresh button   |
| `rowsAndColumns.enabled`   | `boolean` | `false` | Enable rows/columns controls       |
| `rowsAndColumns.className` | `string`  | `''`    | CSS class for the controls         |

### Puzzle Piece Options

| Option          | Type      | Default  | Description           |
| --------------- | --------- | -------- | --------------------- |
| `strokeColor`   | `string`  | `'gold'` | Color of piece stroke |
| `strokeEnabled` | `boolean` | `true`   | Enable piece stroke   |

## Features

- **Drag and Drop**: Smooth drag-and-drop functionality for puzzle pieces
- **Snap to Grid**: Pieces automatically snap to correct positions
- **Keyboard Navigation**: Full keyboard accessibility support
- **Responsive Design**: Optional responsive behavior
- **Customizable**: Extensive customization options
- **Timer**: Optional built-in timer
- **Refresh**: Optional refresh button to restart puzzle
- **Row/Column Controls**: Optional controls to adjust puzzle size
- **Local Storage**: Optional state persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-jigsaw.git
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

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
