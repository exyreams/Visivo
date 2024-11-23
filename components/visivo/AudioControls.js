// noinspection JSUnusedLocalSymbols

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  MdDownload,
  MdPause,
  MdPlayArrow,
  MdStop,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";

const AudioControls = ({ audioUrl }) => {
  // State management for audio player
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // Refs and state for advanced slider control
  const audioRef = useRef(null);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  // Effect to handle audio metadata and time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Handle audio metadata loading
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    // Update current time during playback
    const handleTimeUpdate = () => {
      // Only update if not currently dragging the slider
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };
    // Add event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    // Cleanup event listeners
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isDragging]);
  // Play/Pause toggle handler
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };
  // Stop playback and reset to beginning
  const handleStop = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };
  // Handle slider seeking with improved precision
  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  // Enhanced slider interaction handlers
  const handleSliderMouseDown = (e) => {
    setIsDragging(true);
    // Pause audio during seeking for smoother experience
    if (isPlaying) {
      audioRef.current.pause();
    }
  };
  const handleSliderMouseUp = (e) => {
    setIsDragging(false);
    // Resume playback if it was playing before seeking
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  // Mute/Unmute toggle
  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };
  // Time formatting utility
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  // Download handler for audio file
  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = audioUrl;
    // Extract filename from URL or use a default name
    link.download = audioUrl.split("/").pop() || "audio-file.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Toast on download
    toast.success("Successfully downloaded!");
  };

  return (
    <div className="animate-fade-in mx-auto mr-10 mt-6 w-full max-w-2xl">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} />
      <div className="rounded-xl border border-gray-700/50 bg-gray-800/40 p-4">
        <div className="space-y-4">
          {/* Control buttons section */}
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="rounded-lg border border-purple-500/40 bg-purple-600/40 p-3 text-white transition-all hover:scale-105 hover:bg-purple-600/50"
            >
              {isPlaying ? (
                <MdPause className="h-6 w-6" />
              ) : (
                <MdPlayArrow className="h-6 w-6" />
              )}
            </button>
            {/* Stop Button */}
            <button
              onClick={handleStop}
              className="rounded-lg border border-red-500/40 bg-red-600/40 p-3 text-white transition-all hover:scale-105 hover:bg-red-600/70"
            >
              <MdStop className="h-6 w-6" />
            </button>
            {/* Mute Toggle Button */}
            <button
              onClick={toggleMute}
              className={`rounded-lg border ${isMuted ? "border-yellow-500/40 bg-yellow-600/40 " : "border-blue-500/40 bg-blue-600/40"} p-3 text-white transition-all hover:scale-105 ${isMuted ? "hover:bg-yellow-600/70" : "hover:bg-blue-600/70"}`}
            >
              {isMuted ? (
                <MdVolumeOff className="h-6 w-6" />
              ) : (
                <MdVolumeUp className="h-6 w-6" />
              )}
            </button>
            {/* Time Display with Download Button */}
            <div className="ml-2 flex items-center">
              <span className="mr-2 text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="text-green-400 transition-colors hover:text-green-500"
                title="Download Audio"
              >
                <MdDownload className="h-6 w-6" />
              </button>
            </div>
          </div>
          {/* Improved Slider with Enhanced Interaction */}
          <input
            ref={sliderRef}
            type="range"
            min="0"
            step="0.1" // Increased precision
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleSliderMouseDown}
            onMouseUp={handleSliderMouseUp}
            onTouchStart={handleSliderMouseDown}
            onTouchEnd={handleSliderMouseUp}
            className="group h-3 w-full cursor-pointer appearance-none rounded-full bg-gray-700
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-purple-500
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-125"
            style={{
              background: `linear-gradient(to right, 
                rgba(168, 85, 247, 0.6) ${(
                  (currentTime / (duration || 1)) *
                  100
                ).toFixed(2)}%, 
                #374151 0%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AudioControls;
