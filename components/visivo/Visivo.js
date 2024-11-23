"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import AnalysisResult from "./AnalysisResult";
import { FaImage } from "react-icons/fa6";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Visivo() {
  const { data: session } = useSession();
  const [images, setImages] = useState([]); // State to hold multiple images
  const [imageUrls, setImageUrls] = useState([]); // State to hold URLs for displaying images
  const [imageNames, setImageNames] = useState([]); // State to hold names of images
  const [analysisResults, setAnalysisResults] = useState([]); // Store results for each image
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);

  const fileInputRef = useRef(null);

  const handleImageUpload = useCallback(
    (event) => {
      const files = event.target.files; // Get the selected files
      if (files) {
        const newImages = [];
        const newImageUrls = [];
        const newImageNames = [];
        let hasError = false;

        Array.from(files).forEach((file) => {
          // Check the maximum number of images
          if (images.length >= 3) {
            setError((prevErrors) => [
              ...prevErrors,
              "You can only upload up to 3 images.",
            ]);
            hasError = true;
            return;
          }

          // Check file size limit
          if (file.size > 20 * 1024 * 1024) {
            setError((prevErrors) => [
              ...prevErrors,
              `${file.name}: File size exceeds 20MB limit`,
            ]);
            hasError = true;
            return;
          }

          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/heif",
          ];
          if (!allowedTypes.includes(file.type)) {
            setError((prevErrors) => [
              ...prevErrors,
              `${file.name}: Unsupported image type. Please upload a JPEG, PNG, WEBP, HEIC, or HEIF image.`,
            ]);
            hasError = true;
            return;
          }

          // If no errors, add the image
          newImages.push(file);
          newImageUrls.push(URL.createObjectURL(file));
          newImageNames.push(file.name);
        });

        if (!hasError) {
          setImages((prevImages) => [...prevImages, ...newImages]);
          setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
          setImageNames((prevNames) => [...prevNames, ...newImageNames]);
          setError([]); // Clear errors
        }
      }
    },
    [images],
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files) {
        handleImageUpload({ target: { files } }); // Reuse the image upload logic
      }
    },
    [handleImageUpload],
  );

  const analyzeImages = useCallback(async () => {
    if (images.length === 0) return;

    setIsLoading(true);
    setError([]); // Clear previous errors
    const newAnalysisResults = []; // Store results for each image analysis

    const promises = images.map(async (image) => {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`${image.name}: Failed to analyze image`);
      }

      const result = await response.json();
      newAnalysisResults.push(result.description); // Store each analysis result
      return result.description; // Return the analysis result for each image
    });

    toast.promise(Promise.all(promises), {
      loading: "Analyzing...",
      success: (results) => {
        setAnalysisResults(newAnalysisResults); // Update state with all analysis results
        return "Analyzed successfully!";
      },
      error: (err) => {
        setError((prevErrors) => [...prevErrors, ...err.message.split("\n")]);
        return "Some image analyses failed!";
      },
    });

    setIsLoading(false); // Reset loading state
  }, [images]);

  const resetAll = useCallback(() => {
    setImages([]);
    setImageUrls([]);
    setImageNames([]);
    setAnalysisResults([]); // Clear analysis results
    setError([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Image reset successfully!");
  }, []);

  return (
    <div className="mx-auto max-w-full space-y-6 rounded-3xl border border-gray-700/50 bg-gray-800/50 p-8 backdrop-blur-sm delay-300">
      {session ? (
        <>
          <div
            className="cursor-pointer rounded-lg border-2 border-dashed border-blue-300 p-16 text-center hover:border-blue-400"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex h-full flex-col items-center justify-center space-y-3">
              <p className="mb-2 text-lg">
                Drag and drop images here, or click to select
              </p>
              <FaImage className="text-7xl text-blue-300 hover:text-blue-400" />
              <p className="text-sm text-gray-400">
                Supported formats: JPEG, PNG, WEBP, HEIC, HEIF (max 20MB)
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              onChange={handleImageUpload}
              multiple // Allow multiple file selection
            />
          </div>
          {error.length > 0 && (
            <div className="text-center">
              {error.map((err, index) => (
                <p key={index} className="text-red-500">
                  {err}
                </p>
              ))}
            </div>
          )}
          {imageUrls.length > 0 && (
            <div className="flex flex-wrap justify-center">
              {imageUrls.map((url, index) => (
                <div key={index} className="mx-2 flex flex-col items-center">
                  <Image
                    src={url}
                    alt={`Selected image ${index + 1}`}
                    width={350}
                    height={350}
                    objectFit="contain"
                    className="rounded-lg"
                  />
                  <p className="text-sm text-gray-200">{imageNames[index]}</p>{" "}
                  {/* Display the image name */}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={analyzeImages}
              disabled={images.length === 0 || isLoading}
              className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-3 text-blue-300 transition-all hover:scale-105 hover:bg-blue-600/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Analyzing..." : "Analyze Images"}
            </button>
            <button
              onClick={resetAll}
              className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-3 text-white transition-all hover:scale-105 hover:bg-red-500/80"
            >
              Reset
            </button>
          </div>
          {analysisResults.length > 0 &&
            analysisResults.map((result, index) => (
              <AnalysisResult
                key={index}
                result={result}
                image={images[index]}
              />
            ))}
        </>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-xl font-semibold text-blue-300">
            Please sign in to access the application and utilize its features.
          </p>
        </div>
      )}
    </div>
  );
}
