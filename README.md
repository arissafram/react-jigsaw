# React Jigsaw

A simple and powerful React component for creating interactive jigsaw puzzles with touch support.

## Features

- **Customizable**: Control the number of rows and columns, image source, and more.
- **Responsive**: The puzzle board adapts to the container size.
- **Touch and Pointer Support**: Works on desktop and mobile with native pointer events.
- **Keyboard Accessible**: Move and snap pieces using the keyboard.
- **Snapping**: Pieces snap into place when they are close to their target.
- **Auto-solving**: Animate the puzzle to solve itself.

## Installation

```bash
npm install react-jigsaw
```

or with yarn:

```bash
yarn add react-jigsaw
```

## Usage

```tsx
import { Puzzle } from 'react-jigsaw';

function App() {
  const imageUrl = 'https://your-image-url.com/image.jpg';

  return (
    <Puzzle
      image={imageUrl}
      options={{
        board: {
          rows: 3,
          columns: 3,
        },
      }}
    />
  );
}
```

## API

### `Puzzle` Component Props

| Prop      | Type                                     | Default     | Description                                                            |
| --------- | ---------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `image`   | `string`                                 | `undefined` | The URL of the image to use for the puzzle.                            |
| `options` | [`PuzzleOptions`](./src/types/index.tsx) | `undefined` | An object with options to customize the puzzle. See below for details. |
| `onSnap`  | `() => void`                             | `undefined` | A callback function that is called when a piece is snapped into place. |
| `onDone`  | `() => void`                             | `undefined` | A callback function that is called when the puzzle is completed.       |

### `PuzzleOptions`

| Property      | Type                                              | Default                                         | Description                                                             |
| ------------- | ------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------- |
| `board`       | [`BoardOptions`](./src/types/index.tsx#L10)       | `{ rows: 3, columns: 3 }`                       | Options for the puzzle board, including the number of rows and columns. |
| `puzzlePiece` | [`PuzzlePieceOptions`](./src/types/index.tsx#L15) | `{ strokeEnabled: true, strokeColor: 'white' }` | Options for the puzzle pieces, including stroke color and width.        |
| `callbacks`   | [`Callbacks`](./src/types/index.tsx#L21)          | `{}`                                            | Callbacks for puzzle events, such as `onSnap` and `onDone`.             |
| `snap`        | [`SnapOptions`](./src/types/index.tsx#L26)        | `{ threshold: 20 }`                             | Options for snapping, including the snap threshold.                     |

## Development

To run the demo locally:

1. Clone this repository:

```bash
git clone https://github.com/airstack/react-jigsaw.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the demo:

```bash
npm run demo
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.
