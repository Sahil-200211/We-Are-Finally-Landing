import { useEffect, useState } from "react";
import './TypeWriterText.css';

const TypewriterText = ({ lines, onComplete }: { lines: string[]; onComplete: () => void }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
  if (currentLineIndex >= lines.length) {
    // All lines + hold done → nothing more to do
    return;
  }

  if (charIndex < lines[currentLineIndex].length) {
    // Typing current line
    const timeout = setTimeout(() => {
      setCurrentText((prev) => prev + lines[currentLineIndex][charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 50); // typing speed

    return () => clearTimeout(timeout);
  } else {
    // Finished typing current line
    if (currentLineIndex === lines.length - 1) {
      // LAST line → HOLD for X ms before calling onComplete
      const holdTimeout = setTimeout(() => {
        onComplete();
      }, 2000); 

      return () => clearTimeout(holdTimeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentText("");
        setCharIndex(0);
      }, 800); // delay between lines

      return () => clearTimeout(lineTimeout);
    }
  }
}, [charIndex, currentLineIndex, lines, onComplete]);



  return (
    <div className="text-2xl text-center text-green-400 mt-10 font-mono">
      <p>{currentText}&nbsp;<span className="animate-pulse">|</span></p>
    </div>
  );
};

export default TypewriterText;
