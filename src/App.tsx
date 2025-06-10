import { useEffect, useRef, useState } from "react";
import { ApodViewer } from "./components/ApodViewer";
import { DatePicker } from "./components/DatePicker";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const startLanding = () => {
    setTimeout(() => {
      setIsSplashDone(true);
    }, 7000);
  };

  useEffect(() => {
    if (isSplashDone && !date) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [isSplashDone, date]);

  const handlePrev = () => {
    if (!date) return;
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    setDate(prevDate.toISOString().split("T")[0]);
  };

  const handleNext = () => {
    if (!date) return;
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const today = new Date().toISOString().split("T")[0];
    const newDate = nextDate.toISOString().split("T")[0];
    if (newDate <= today) setDate(newDate);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden z-1">
      <audio ref={audioRef} src="/we-are-finally-landing.mp3" loop />

      {!isSplashDone ? (
        <>
          <SplashScreen onStart={startLanding} onMusicStart={startMusic} />
        </>
      ) : (
        <>
          {/* Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            className="fixed top-4 right-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded z-50"
          >
            {isMuted ? "Unmute Music 🎵" : "Mute Music 🔇"}
          </button>

          <header className="text-center py-6">
            {/* No title here anymore */}
          </header>

          <DatePicker date={date} onDateChange={setDate} />

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Next
            </button>
          </div>

          <ApodViewer date={date} />
        </>
      )}
    </div>
  );
}

export default App;
