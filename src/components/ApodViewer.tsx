import { motion } from "framer-motion";
import { useApod } from "../hooks/useApod";
import { downloadImage } from "../utils/downloadImage";

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
      className="max-w-4xl mx-auto p-4 text-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      {data.media_type === "image" ? (
        <>
          <motion.img
            src={data.url}
            alt={data.title}
            className="w-full rounded-lg shadow-lg mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <a
            href={data.hdurl || data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-400 rounded text-white mt-4"
          >
            Download Image
          </a>
        </>
      ) : (
        <iframe
          src={data.url}
          title={data.title}
          allow="fullscreen"
          className="w-full h-[500px] rounded-lg shadow-lg mb-4"
        />
      )}
      <p className="text-lg">{data.explanation}</p>
    </motion.div>
  );
};
