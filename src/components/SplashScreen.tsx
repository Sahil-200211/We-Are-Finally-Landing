import { useState } from "react";
import { motion } from "framer-motion";
import { BlurIn } from "./Blur-in";
import TypewriterText from "./TypewriterText";

const SplashScreen = ({
  onStart,
  onMusicStart,
}: {
  onStart: () => void;
  onMusicStart: () => void;
}) => {
  const [started, setStarted] = useState(false);

  const typewriterLines = [
    "Initializing engines...",
    "Calibrating starfield sensors...",
    "Charging hyperdrive...",
    "Plotting course to APOD...",
    "Preparing for landing...",
    "Landing.",
  ];

  const handleStartLanding = () => {
    setStarted(true);
    onMusicStart();
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center text-white min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {!started && (
        <>
          <BlurIn>We Are Finally Landing</BlurIn>

          <motion.div
            className="h-1 w-48 bg-gradient-to-r from-green-500 to-cyan-600 mb-8"
            initial={{ width: 0 }}
            animate={{ width: "47rem" }}
            transition={{ duration: 4 }}
          />

          <button
            onClick={handleStartLanding}
            className="px-6 py-3 bg-gradient-to-br from-cyan-700 to-blue-900 text-lg font-extrabold text-blue-100 rounded-xl border border-cyan-400/30 hover:border-cyan-300/60 shadow-md hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm tracking-widest uppercase font-mono"
          >
            Initiate Landing Sequence
          </button>
        </>
      )}

      {started && (
        <TypewriterText
          lines={typewriterLines}
          onComplete={() => {
            onStart();
          }}
        />
      )}

      {!started && (
        <button
          onClick={() => {
            onMusicStart();
            onStart(); // go straight to landing
          }}
          className="fixed bottom-4 right-4 px-4 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-green-500 to-cyan-400 text-white border border-gray-500/40 shadow-md hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
        >
          Skip Intro
        </button>
      )}
    </motion.div>
  );
};

export default SplashScreen;
