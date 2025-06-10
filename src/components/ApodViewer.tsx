import { motion } from "framer-motion";
import { useApod } from "../hooks/useApod";
import { useState, type Key } from "react";
import DecryptedText from "./DecryptedText";

interface ApodViewerProps {
  date?: string;
}

export const ApodViewer = ({ date }: ApodViewerProps) => {
  const { data, loading, error } = useApod(date);
  const [imgLoaded, setImgLoaded] = useState(false);

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
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8">{data.title}</h1>

      {/* Image + Text side by side */}
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0 lg:space-x-12">
        {/* Image */}
        <div className="flex-1">
          {data.media_type === "image" ? (
            <>
              <motion.img
                src={data.url}
                alt={data.title}
                className="w-full rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={imgLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                onLoad={() => setImgLoaded(true)}
              />
              <a
                href={data.hdurl || data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-400 rounded text-white mt-4 ml-50"
              >
                Download Image
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

        <div className="flex-1 text-left">
          {data.explanation.split(". ").map((line: string, index: Key | null | undefined) => (
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
