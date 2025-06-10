import { useState } from "react";
import { motion } from "framer-motion";
import { BlurIn } from "./Blur-in";
import TypewriterText from "./TypewriterText";

const SplashScreen = ({onStart, onMusicStart} : { onStart: () => void, onMusicStart: () => void }) => {
  const [started, setStarted] = useState(false);

  const typewriterLines = [
    "Initializing engines...",
    "Calibrating starfield sensors...",
    "Charging hyperdrive...",
    "Plotting course to APOD...",
    "Preparing for landing...",
    "Landing.",
  ];
  
  const handleStartLanding =() => {
    setStarted(true);
    onMusicStart();   
  }

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
            className="h-1 w-48 bg-gradient-to-r from-purple-500 to-blue-500 mb-8"
            initial={{ width: 0 }}
            animate={{ width: "35rem" }}
            transition={{ duration: 4 }}
          />

          <button
            onClick={handleStartLanding}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-400 rounded text-lg font-bold"
          >
            Start Landing 🚀
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
    </motion.div>
  );
};

export default SplashScreen;
