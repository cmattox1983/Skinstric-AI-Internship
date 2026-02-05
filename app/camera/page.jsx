"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Camera() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/camera/capture");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div className="md:h-[85vh] h-[65vh] bg-white flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[70vh] overflow-auto">
          <div className="flex-0 flex flex-col md:flex-row items-center justify-center relative">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
            <Image
              alt="Diamond Large"
              src="/media/diamond-light-large.png"
              width={482}
              height={482}
              loading="lazy"
              decoding="async"
              className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200"
            />
            <Image
              alt="Diamond Medium"
              src="/media/diamond-medium-medium.png"
              width={444.34}
              height={444.34}
              loading="lazy"
              decoding="async"
              className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-190"
            />
            <Image
              alt="Diamond Small"
              src="/media/diamond-dark-small.png"
              width={405.18}
              height={405.18}
              loading="lazy"
              decoding="async"
              className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest rotate-185"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
              <Image
                alt="Camera Icon"
                src="/media/camera-icon.png"
                width={136}
                height={136}
                loading="lazy"
                decoding="async"
                className="h-[100px] w-[100px] md:h-[136px] md:w-[136px] animate-pulse-grow"
                style={{ camera: "transparent" }}
              />
              <p className="absolute font-semibold text-sm md:text-base leading-[24px] tracking-tight translate-y-22 animate-pulse">
                SETTING UP CAMERA ...
              </p>
            </div>
          </div>
          <div className="mt-0 text-center">
            <p className="text-xs md:text-sm mb-4 leading-6">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex justify-center space-x-8">
              <p className="text-xs md:text-sm leading-6">
                ◇ NEUTRAL EXPRESSION
              </p>
              <p className="text-xs md:text-sm leading-6">◇ FRONTAL POSE</p>
              <p className="text-xs md:text-sm leading-6">
                ◇ ADEQUATE LIGHTING
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Camera;
