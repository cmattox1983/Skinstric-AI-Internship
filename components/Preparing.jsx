import React from "react";
import Image from "next/image";

function Preparing() {
  return (
    <>
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-[30px] space-y-[-20px] md:space-y-0">
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>

          <Image
            src="/media/diamond-light-large.png"
            alt="Diamond Large"
            loading="lazy"
            decoding="async"
            width={482}
            height={482}
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200"
          />

          <Image
            src="/media/diamond-medium-medium.png"
            alt="DiamondMedium"
            loading="lazy"
            decoding="async"
            width={444.34}
            height={444.34}
            className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-190"
          />

          <Image
            src="/media/diamond-dark-small.png"
            alt="DiamondSmall"
            loading="lazy"
            decoding="async"
            width={405.18}
            height={405.18}
            className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest rotate-185"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-4 space-y-0">
            <p className="text-base font-semibold leading-6 tracking-tight">
              PREPARING YOUR ANALYSIS
            </p>
            <div>
              <div className="flex items-center justify-center space-x-4 py-8">
                <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_0ms] opacity-30"></div>
                <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_250ms] opacity-30"></div>
                <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_500ms] opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preparing;
