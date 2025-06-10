import { useEffect, useRef, useState } from "react";
import { ApodViewer } from "./components/ApodViewer";
import { DatePicker } from "./components/DatePicker";
import SplashScreen from "./components/SplashScreen";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";

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
          <button
            onClick={toggleMute}
            className="fixed top-4 left-4 px-5 py-2 rounded-xl bg-gradient-to-br from-pink-700 to-purple-900 text-sm md:text-base font-semibold text-white shadow-md hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-500/30 hover:border-purple-400/60 backdrop-blur-sm z-50"
          >
            {isMuted ? <GoUnmute /> : <GoMute />}
          </button>

          <DatePicker date={date} onDateChange={setDate} />

          <div className="fixed top-16 right-5 space-x-4 z-50 mt-1">
            <button
              onClick={handlePrev}
              className="rounded-full bg-gradient-to-br from-purple-800 to-indigo-700 px-5 py-3 text-sm md:text-base font-semibold text-white shadow-md hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-purple-500/30 hover:border-indigo-400/60 backdrop-blur-sm"
            >
              <FaChevronCircleLeft />
            </button>
            <button
              onClick={handleNext}
              className="rounded-full bg-gradient-to-br from-indigo-700 to-purple-800 px-5 py-3 text-sm md:text-base font-semibold text-white shadow-md hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-indigo-500/30 hover:border-purple-400/60 backdrop-blur-sm"
            >
              <FaChevronCircleRight />
            </button>
          </div>

          <ApodViewer date={date} />
        </>
      )}
    </div>
  );
}

export default App;
