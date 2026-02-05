"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AnalyzeImage from "../../../components/AnalyzeImage";
import { useRouter } from "next/navigation";

function Capture() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [snapshotBase64, setSnapshotBase64] = useState(null);
  const [hasSnapshot, setHasSnapshot] = useState(false);
  const router = useRouter();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not access camera.");
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const takeSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);

    const base64 = canvas.toDataURL("image/png");

    setSnapshotBase64(base64);
    setHasSnapshot(true);

    stopCamera();
  };

  const useSnapshot = async (e) => {
    if (!snapshotBase64) return;
    setStatus("loading");
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: snapshotBase64 }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          `API error ${response.status}: ${result?.message} || "Unknown Error"`,
        );
      }

      console.log("API Response:", result);

      sessionStorage.setItem("demographicData", JSON.stringify(result.data));
      setTimeout(() => router.push("/select"), 2000);
    } catch (error) {
      console.error("Error converting file to base64:", error);
      alert("There was an error processing the image. Please try again.");
    }
  };

  const retakeSnapshot = () => {
    setSnapshotBase64(null);
    setHasSnapshot(false);
    setError(null);
    startCamera();
  };

  return (
    <>
      <div className="h-[90vh] w-screen">
        <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">
          <div className="absolute inset-0 z-10">
            <video
              autoPlay
              playsInline
              muted
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
            ></video>

            {hasSnapshot && snapshotBase64 && (
              <div className="absolute inset-0 z-20">
                <img
                  src={snapshotBase64}
                  alt="Snapshot"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute left-1/2 top-24 -translate-x-1/2 text-sm leading-6 uppercase text-[#FCFCFC]">
                  GREAT SHOT!
                </div>

                <div className="absolute left-1/2 top-[58%] -translate-x-1/2 text-center z-30">
                  <h2 className="text-lg font-semibold text-[#FCFCFC] drop-shadow-md">
                    Preview
                  </h2>

                  <div className="mt-4 flex justify-center space-x-6">
                    <button
                      onClick={retakeSnapshot}
                      className="px-6 py-2 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
                    >
                      Retake
                    </button>
                    <button
                      className="px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm"
                      onClick={useSnapshot}
                    >
                      {status === "loading" ? "Uploading..." : "Use This Photo"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 z-30 flex items-center justify-center text-white text-sm px-6 text-center">
                {error}
              </div>
            )}

            {!hasSnapshot && (
              <>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
                  <div className="font-semibold text-sm tracking-tight leading-[14px] text-[#FCFCFC] hidden sm:block">
                    TAKE PICTURE
                  </div>
                  <div className="transform hover:scale-105 ease-in-out duration-300">
                    <Image
                      alt="Take Picture"
                      src="/media/TakePicture.png"
                      loading="lazy"
                      width={60}
                      height={60}
                      decoding="async"
                      className="w-16 h-16 cursor-pointer"
                      onClick={takeSnapshot}
                    />
                  </div>
                </div>

                <div className="absolute bottom-30 sm:bottom-40 left-0 right-0 text-center z-20">
                  <p className="text-sm font-normal md:text-sm mb-2 leading-6 text-[#FCFCFC]">
                    TO GET BETTER RESULTS MAKE SURE TO HAVE
                  </p>
                  <div className="flex justify-center space-x-8 text-xs leading-6 text-[#FCFCFC]">
                    <p>◇ NEUTRAL EXPRESSION</p>
                    <p>◇ FRONTAL POSE</p>
                    <p>◇ ADEQUATE LIGHTING</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="absolute md:bottom-8 bottom-60 left-8 z-20">
            <Link href="/result">
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden text-[#FCFCFC]">
                    BACK
                  </span>
                </div>

                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className="relative w-12 h-12 hidden sm:flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
                    <span className="rotate-[-45deg] text-[#FCFCFC] text-sm font-semibold leading-none group-hover:scale-[0.92] ease duration-300">
                      ◀
                    </span>
                  </div>

                  <span className="text-sm font-semibold hidden sm:block ml-6 text-[#FCFCFC]">
                    BACK
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          {status === "loading" && <AnalyzeImage />}
        </div>
      </div>
    </>
  );
}

export default Capture;
