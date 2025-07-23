import Puzzle from '@/components/puzzle';
import TestComponent from '@/components/test';

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Jigsaw Demo</h1>

      {/* Test component to demonstrate the new SVG drag hook */}
      <TestComponent />

      <hr style={{ margin: '40px 0', border: '1px solid #eee' }} />

      {/* Original puzzle component */}
      <h2>Full Jigsaw Puzzle</h2>
      <Puzzle image={DEMO_IMAGE} options={{ board: { columns: 3, rows: 3 } }} />
    </div>
  );
};

export default App;
