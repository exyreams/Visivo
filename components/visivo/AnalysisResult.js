// noinspection JSUnusedLocalSymbols

import React, { useState } from "react";
import { toast } from "sonner";
import AudioControls from "./AudioControls";

const AnalysisResult = ({ result, image }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  // Early return if no result is provided
  if (!result) return null;

  const handleSynthesize = async () => {
    if (isSynthesizing) return;

    setError(null);
    setIsSynthesizing(true);

    // eslint-disable-next-line no-unused-vars
    const synthesisToast = toast.promise(
      async () => {
        try {
          // Check if audio is already cached
          if (cache[result]) {
            setAudioUrl(cache[result]);
            setShowPlayer(true);
            return "Audio synthesized successfully from cache!";
          }

          const formData = new FormData();
          formData.append("image", image);
          formData.append("action", "synthesize");
          formData.append("text", result);

          const response = await fetch("/api/analyze", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to synthesize speech");
          }

          const audioBlob = await response.blob();
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          setShowPlayer(true);
          setCache((prevCache) => ({
            ...prevCache,
            [result]: url,
          }));

          return "Audio synthesized successfully!";
        } catch (error) {
          console.error("Error synthesizing speech:", error);
          setError("Failed to synthesize speech. Please try again.");
          throw error; // Re-throw to trigger error toast
        } finally {
          setIsSynthesizing(false);
        }
      },
      {
        loading: "Synthesizing audio...",
        success: (message) => message,
        error: "Failed to synthesize audio",
      },
    );
  };

  return (
    <div className="animate-fade-in mx-auto mt-10 w-full max-w-3xl rounded-2xl border border-gray-700/50 bg-gray-900/50 p-8">
      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gray-900/50 blur-lg"></div>
        <div className="relative space-y-6">
          <h3 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-semibold text-transparent">
            Analysis Result:
          </h3>
          <p className="text-lg leading-relaxed text-gray-300">{result}</p>
          <button
            onClick={handleSynthesize}
            disabled={isSynthesizing}
            className={`mt-6 rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-3 text-blue-300 transition-all
              ${
                isSynthesizing
                  ? "cursor-not-allowed opacity-50"
                  : "hover:scale-105 hover:bg-blue-600/30"
              }`}
          >
            {isSynthesizing ? "Synthesizing..." : "Synthesize Audio"}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {showPlayer && <AudioControls audioUrl={audioUrl} />}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
