import { useState } from 'react';
import Puzzle from '@/components/puzzle';

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const DEMO_IMAGE_2 =
  'https://cdn.outsideonline.com/wp-content/uploads/2023/03/Funny_Dog_H.jpg?auto=webp&width=3840&quality=75&fit=cover';

const App = () => {
  const [imageSource, setImageSource] = useState(DEMO_IMAGE);

  const handleRefresh = () => {
    setImageSource(DEMO_IMAGE_2);
  };

  return (
    <div className="puzzleWrapper">
      <Puzzle
        image={imageSource}
        onRefresh={handleRefresh}
        options={{
          board: { columns: 2, rows: 2 },
          puzzle: {
            responsive: true,
            timer: { enabled: true },
            refreshButton: { enabled: true },
            rowsAndColumns: { enabled: true },
          },
        }}
      />
    </div>
  );
};

export default App;
