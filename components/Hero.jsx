"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [hoverSide, setHoverSide] = useState(null);
  const [alignSide, setAlignSide] = useState(null); // delayed alignment to prevent snapping
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  // Delay the alignment change until AFTER skincare finishes its delayed move
  useEffect(() => {
    if (!hoverSide) {
      setAlignSide(null);
      return;
    }

    // Sophisticated: 500ms
    // skincare: 80ms delay + 500ms move = 580ms
    const t = setTimeout(() => {
      setAlignSide(hoverSide);
    }, 600); // slightly after 580ms so there's no snap at the end

    return () => clearTimeout(t);
  }, [hoverSide]);

  const moveX =
    hoverSide === "left"
      ? "translate-x-[300px]"
      : hoverSide === "right"
        ? "-translate-x-[300px]"
        : "translate-x-0";

  const alignClass =
    alignSide === "left"
      ? "text-right"
      : alignSide === "right"
        ? "text-left"
        : "text-center";

  return (
    <>
      <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
        <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>

          <div id="main-heading" className="relative z-10 text-center">
            <h1
              className={`text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none
    transition-[transform,opacity] duration-500 [transition-timing-function:cubic-bezier(0.45,0,0.55,1)]
    will-change-transform
    ${isMounted ? "opacity-100" : "opacity-0"} 
    ${
      hoverSide === "left"
        ? "translate-x-[20rem]"
        : hoverSide === "right"
          ? "-translate-x-[20rem]"
          : "translate-x-0"
    }`}
            >
              Sophisticated
              <br />
              <span
                className={`block text-[#1A1B1C]
      transition-transform duration-500 delay-[120ms]
      [transition-timing-function:cubic-bezier(0.45,0,0.55,1)]
      will-change-transform
      ${
        hoverSide === "left"
          ? "translate-x-[6rem]"
          : hoverSide === "right"
            ? "-translate-x-[6rem]"
            : "translate-x-0"
      }`}
              >
                skincare
              </span>
            </h1>
          </div>

          <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>

          <div className="z-10 mt-4 lg:hidden">
            <Link href="/testing">
              <button className="relative flex items-center gap-4 hover:scale-105 duration-300">
                <span className="text-[12px] font-bold cursor-pointer">
                  ENTER EXPERIENCE
                </span>

                <div className="relative w-[24px] h-[24px] border border-solid border-black rotate-45 cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 -rotate-45 fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </Link>
          </div>

          <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
            <p>
              Skinstric developed an A.I. that creates a <br />
              highly personalized routine tailored to <br />
              what your skin needs.
            </p>
          </div>

          <div
            id="left-section"
            className={`hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px]
              transition-opacity duration-500 ease-in-out
              ${
                hoverSide === "right"
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>

              <button
                id="discover-button"
                onMouseEnter={() => setHoverSide("left")}
                onMouseLeave={() => setHoverSide(null)}
                className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20 px-3 py-1"
              >
                <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 transition-transform duration-300"></div>
                <span className="absolute left-[18px] top-[8px] scale-[0.9] rotate-180 group-hover:scale-105 transition-transform duration-300">
                  ▶
                </span>
                <span>DISCOVER A.I.</span>
              </button>
            </div>
          </div>

          <div
            id="right-section"
            className={`hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px]
              transition-opacity duration-500 ease-in-out
              ${
                hoverSide === "left"
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>

              <Link href="/testing">
                <button
                  id="take-test-button"
                  onMouseEnter={() => setHoverSide("right")}
                  onMouseLeave={() => setHoverSide(null)}
                  className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 left-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20 px-3 py-1"
                >
                  TAKE TEST
                  <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="absolute left-[107px] top-[9px] scale-[0.9] cursor-pointer group-hover:scale-105 transition-transform duration-300">
                    ▶
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
