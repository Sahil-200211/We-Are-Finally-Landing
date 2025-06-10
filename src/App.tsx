import { useState } from 'react';
import { ApodViewer } from './components/ApodViewer';
import { DatePicker } from './components/DatePicker';

function App() {
  const [date, setDate] = useState<string | undefined>(undefined);

  const handlePrev = () => {
    if (!date) return;
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    setDate(prevDate.toISOString().split('T')[0]);
  };

  const handleNext = () => {
    if(!date) return;
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const today = new Date().toISOString().split('T')[0];
    const newDate = nextDate.toISOString().split('T')[0];
    if (newDate <= today) setDate(newDate);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <header className="text-center py-6">
        <h1 className="text-5xl font-extrabold">We Are Finally Landing 🚀</h1>
      </header>

      <DatePicker date={date} onDateChange={setDate} />

      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={handlePrev} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
          Prev
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
          Next
        </button>
      </div>

      <ApodViewer date={date} />
    </div>
  );
}

export default App;
