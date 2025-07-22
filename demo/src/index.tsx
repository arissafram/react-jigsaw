import Puzzle from '@/components/puzzle';

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const App = () => {
  return (
    <>
      <Puzzle
        image={DEMO_IMAGE}
        options={{
          board: {
            backgroundColor: 'transparent',
            columns: 4,
            height: 500,
            rows: 5,
            showGridOutlines: true,
            width: 400,
          },
          puzzlePiece: {
            strokeColor: 'gold',
            strokeEnabled: true,
            strokeWidth: 2,
          },
          shuffleArea: 'board',
        }}
      />
      <p>hello</p>
    </>
  );
};

export default App;
