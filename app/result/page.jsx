"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Preparing from "../../components/Preparing";
import { useRouter } from "next/navigation";

function Result() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const fileInputRef = useRef(null);
  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("loading");

    setPreview(URL.createObjectURL(file));

    try {
      const base64Image = await fileToBase64(file);
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
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
      setStatus("success");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Image analyzed successfully!");
      router.push("/select");
    } catch (error) {
      console.error("Error converting file to base64:", error);
      alert("There was an error processing the image. Please try again.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toCapture = () => {
    router.push("/camera/");
  };

  return (
    <>
      <div className="min-h-[92vh] flex flex-col bg-white relative">
        <div className="absolute top-2 left-9 md:left-8 text-left">
          <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>

        <div className="absolute top-[75px] right-7 md:top-[20px] md:right-8 transition-opacity duration-300 opacity-100">
          <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {status === "idle" && (
          <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-[30px] space-y-[-20px] md:space-y-0">
            <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
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

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Image
                  src="/media/camera-icon.png"
                  alt="CameraIcon"
                  loading="lazy"
                  height={136}
                  width={136}
                  decoding="async"
                  onClick={openModal}
                  className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-[1.08] duration-700 ease-in-out cursor-pointer"
                />

                <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
                  <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                    ALLOW A.I.
                    <br />
                    TO SCAN YOUR FACE
                  </p>
                  <Image
                    src="/media/Group 39690.png"
                    alt="ScanLine"
                    loading="lazy"
                    decoding="async"
                    width={66}
                    height={59}
                    className="absolute hidden md:block md:right-[143px] md:top-[20px]"
                  />
                </div>
              </div>
              {isModalOpen && (
                <div className="absolute md:top-[43%] md:left-[360px] w-[352px] z-50">
                  <div className="bg-[#1A1B1C] pt-4 pb-2">
                    <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-[24px] pl-4">
                      ALLOW A.I. TO ACCESS YOUR CAMERA
                    </h2>
                    <div className="flex justify-end mt-4 border-t border-[#FCFCFC] pt-2">
                      <button
                        className="px-7 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500"
                        onClick={closeModal}
                      >
                        DENY
                      </button>
                      <button
                        className="px-5 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300"
                        onClick={toCapture}
                      >
                        ALLOW
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isModalOpen ? (
              <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-50 pointer-events-none flex flex-col items-center mt-12 md:mt-0 justify-center">
                <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>

                <Image
                  src="/media/diamond-light-large.png"
                  alt="Diamond Large"
                  loading="lazy"
                  decoding="async"
                  width={484}
                  height={484}
                  className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
                />

                <Image
                  src="/media/diamond-medium-medium.png"
                  alt="DiamondMedium"
                  loading="lazy"
                  decoding="async"
                  width={448}
                  height={448}
                  className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-195"
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

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Image
                    src="/media/gallery-icon.png"
                    alt="GalleryIcon"
                    loading="lazy"
                    height={136}
                    width={136}
                    decoding="async"
                    className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-[1.08] duration-700 ease-in-out cursor-pointer"
                  />

                  <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
                    <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                      ALLOW A.I.
                      <br />
                      ACCESS GALLERY
                    </p>
                    <Image
                      src="/media/Union.png"
                      alt="ScanLine"
                      loading="lazy"
                      decoding="async"
                      width={66.33}
                      height={59.37}
                      className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100 flex flex-col items-center mt-12 md:mt-0 justify-center">
                <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>

                <Image
                  src="/media/diamond-light-large.png"
                  alt="Diamond Large"
                  loading="lazy"
                  decoding="async"
                  width={484}
                  height={484}
                  className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
                />

                <Image
                  src="/media/diamond-medium-medium.png"
                  alt="DiamondMedium"
                  loading="lazy"
                  decoding="async"
                  width={448}
                  height={448}
                  className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-195"
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

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Image
                    src="/media/gallery-icon.png"
                    alt="GalleryIcon"
                    loading="lazy"
                    height={136}
                    width={136}
                    decoding="async"
                    onClick={openGallery}
                    className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-[1.08] duration-700 ease-in-out cursor-pointer"
                  />

                  <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
                    <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                      ALLOW A.I.
                      <br />
                      ACCESS GALLERY
                    </p>
                    <Image
                      src="/media/Union.png"
                      alt="ScanLine"
                      loading="lazy"
                      decoding="async"
                      width={66.33}
                      height={59.37}
                      className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                    />
                  </div>
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        )}
        {(status === "loading" || status === "success") && <Preparing />}

        <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-[30.5px] mb-0 md:mb-0">
          <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
            <Link className="relative" aria-label="Back" href="/testing">
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                    BACK
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
                  <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                  <span className="text-sm font-semibold hidden sm:block ml-6">
                    BACK
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/select">
              <div className="hidden">
                <div>
                  <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                      PROCEED
                    </span>
                  </div>
                  <div className="group hidden sm:flex flex-row relative justify-center items-center">
                    <span className="text-sm font-semibold hidden sm:block mr-5">
                      PROCEED
                    </span>
                    <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
                    <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                      ▶
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
