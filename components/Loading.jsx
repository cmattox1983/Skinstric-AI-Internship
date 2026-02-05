import Image from "next/image";
import Link from "next/link";
import React from "react";

function Loading() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full flex-1">
        <div className="relative z-10">
          <p className="text-lg text-gray-500 mb-2">Processing submission</p>

          <div className="flex items-center justify-center space-x-4 py-8">
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_0ms] opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_250ms] opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_500ms] opacity-30"></div>
          </div>
        </div>

        <Image
          src="/media/diamond-light-large.png"
          alt="Diamond Large"
          loading="eager"
          decoding="async"
          width={762}
          height={762}
          className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow rotate-190"
        />

        <Image
          src="/media/diamond-medium-medium.png"
          alt="Diamond Medium"
          loading="lazy"
          decoding="async"
          width={682}
          height={682}
          className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower rotate-185"
        />

        <Image
          src="/media/diamond-dark-small.png"
          alt="Diamond Small"
          loading="lazy"
          decoding="async"
          width={602}
          height={602}
          className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest rotate-185"
        />
      </div>

      <div className="absolute bottom-[38.5px] md:bottom-8 w-full flex justify-between md:px-9 px-[13px]">
        <Link href="/" aria-label="Back" className="inset-0">
          <div>
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                BACK
              </span>
            </div>

            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                ▶
              </span>
              <span className="text-sm font-semibold hidden sm:block ml-6">
                BACK
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Loading;
