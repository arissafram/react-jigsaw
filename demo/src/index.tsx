import { useState } from 'react';
import Puzzle from '@/components/puzzle';
import { PuzzleOptions } from '@/types';

import PropOptionsWrapper from './components/props-options-wrapper';

import './styles.scss';

import dasie1 from './assets/dasie-1.jpg';
import dasie2 from './assets/dasie-2.jpg';
import dasie3 from './assets/dasie-3.jpg';
import dasie4 from './assets/dasie-4.jpg';

const DASIE_IMAGES = [dasie1, dasie2, dasie3, dasie4];

const App = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageSource, setImageSource] = useState(DASIE_IMAGES[0]);
  const [options, setOptions] = useState<PuzzleOptions | undefined>(undefined);
  const [puzzleKey, setPuzzleKey] = useState(0);

  const handleRefresh = () => {
    // ycle through images
    const nextIndex = (imageIndex + 1) % DASIE_IMAGES.length;
    setImageIndex(nextIndex);
    setImageSource(DASIE_IMAGES[nextIndex]);
  };

  const handlePropsChange = (newOptions: PuzzleOptions) => {
    setOptions(newOptions);
    // Force re-render by updating the key
    setPuzzleKey((prev) => prev + 1);
  };

  return (
    <div className="puzzleWrapper">
      <h1 className="header">React Jigsaw Demo</h1>
      <div className="puzzleContainer">
        <Puzzle key={puzzleKey} image={imageSource} onRefresh={handleRefresh} options={options} />
        <PropOptionsWrapper handlePropsChange={handlePropsChange} />
        <a
          className="githubLink"
          href="https://github.com/arissafram/react-jigsaw"
          rel="noopener noreferrer"
          target="_blank"
        >
          react-jigsaw
        </a>
      </div>
    </div>
  );
};

export default App;
