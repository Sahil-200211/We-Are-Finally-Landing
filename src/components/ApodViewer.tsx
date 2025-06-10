import { motion } from "framer-motion";
import { useApod } from "../hooks/useApod";
import { type Key } from "react";
import DecryptedText from "./DecryptedText";
import { FaDownload } from "react-icons/fa";

interface ApodViewerProps {
  date?: string;
}

export const ApodViewer = ({ date }: ApodViewerProps) => {
  const { data, loading, error } = useApod(date);

  if (loading)
    return (
      <div className="text-center text-white mt-10">🚀 Loading APOD...</div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <motion.div
      key={data.date}
      className="max-w-6xl mx-auto p-4 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-6xl font-[Merriweather] font-bold text-center mb-8">
        {data.title}
      </h1>

      {/* Image + Text side by side */}
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0 lg:space-x-12">
        {/* Image */}
        <div className="flex-1">
          {data.media_type === "image" ? (
            <>
              <motion.img
                src={data.url}
                alt={data.title}
                className="w-full h-full rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.0 }}
              />
              <a
                href={data.hdurl || data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-br from-yellow-500 via-orange-600 to-red-600 text-white font-bold uppercase tracking-wider shadow-lg hover:shadow-orange-400/50 transition-all duration-300 hover:scale-105 active:scale-95 border border-orange-300/30 backdrop-blur-md animate-[pulse_2.5s_infinite]"
              >
              <FaDownload/>
              </a>
            </>
          ) : (
            <iframe
              src={data.url}
              title={data.title}
              allow="fullscreen"
              className="w-full h-[500px] rounded-lg shadow-lg"
            />
          )}
        </div>

        <div className="flex-1 text-left font-[Aldrich]">
          {data.explanation
            .split(". ")
            .map((line: string, index: Key | null | undefined) => (
              <div key={index} className="mb-1">
                <DecryptedText
                  text={line}
                  animateOn="view"
                  revealDirection="start"
                  speed={100}
                  maxIterations={30}
                  className="text-lg leading-relaxed text-white"
                  encryptedClassName="text-gray-500"
                  parentClassName="block"
                />
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};
