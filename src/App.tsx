import { useState } from 'react';
import { ApodViewer } from './components/ApodViewer';

function App() {
  const [date, setDate] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Optional: Add your AnimatedBackground component here */}
      <header className="text-center py-6">
        <h1 className="text-5xl font-extrabold">We Are Finally Landing 🚀</h1>
      </header>
      {/* Add DatePicker here later */}
      <ApodViewer date={date} />
    </div>
  );
}

export default App;
