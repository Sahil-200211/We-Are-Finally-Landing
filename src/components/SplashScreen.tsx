import { motion } from "framer-motion";

const SplashScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <motion.h1
        className="text-6xl font-extrabold mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 2,
        }}
      >
        We Are Finally Landing
      </motion.h1>

      <motion.div
        className="h-1 w-48 bg-gradient-to-r from-purple-500 to-blue-500 mb-8"
        initial={{ width: 0 }}
        animate={{ width: "12rem" }}
        transition={{ duration: 2 }}
      />

      <button
        onClick={onStart}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-400 rounded text-lg font-bold"
      >
        Start Landing 🚀
      </button>
    </motion.div>
  );
};


export default SplashScreen;
