"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Success from "@/components/Success";
import Loading from "@/components/Loading";

export default function Testing() {
  const [step, setStep] = useState(1);
  const [nameInput, setNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const value = event.target.value;

    if (errorMessage) setErrorMessage("");

    if (step === 1) {
      setNameInput(value);
    } else if (step === 2) {
      setLocationInput(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (step === 1) {
      const trimmedName = nameInput.trim();

      if (!trimmedName) {
        setErrorMessage("Please enter your name");
        setNameInput("");
        return;
      }

      const nameIsValid = /^[A-Za-z\s]+$/.test(trimmedName);
      if (!nameIsValid) {
        setErrorMessage(
          "Please enter a valid name without numbers or special characters",
        );
        setNameInput("");
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      const trimmedLocation = locationInput.trim();

      if (!trimmedLocation) {
        setErrorMessage("Please enter your city name");
        setLocationInput("");
        return;
      }

      const locationIsValid = /^[A-Za-z\s]+$/.test(trimmedLocation);
      if (!locationIsValid) {
        setErrorMessage(
          "Please enter a valid city name without numbers or special characters",
        );
        setLocationInput("");
        return;
      }

      const user = { name: nameInput, location: locationInput };
      localStorage.setItem("user", JSON.stringify(user));

      const sendUserToAPI = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        setStatus("loading");

        try {
          const userToSend = JSON.parse(storedUser);
          const response = await fetch(
            "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userToSend),
            },
          );

          const result = await response.json();
          if (!response.ok) {
            throw new Error(
              `API error ${response.status}: ${result?.message} || "Unknown Error"`,
            );
          }
          setTimeout(() => {
            setStatus("success");
            console.log("SUCCESS:", result.message);
          }, 1500);
        } catch (error) {
          setStatus("error");
          console.error("Error:", error);
        }
      };

      sendUserToAPI();
    }
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="font-semibold text-xs">TO START ANALYSIS</p>
      </div>

      {status === "idle" && (
        <>
          <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
            <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
              Click to Type
            </p>

            <form className="relative z-10" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
                )}
              </div>

              <input
                type="text"
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
                placeholder={
                  step === 1 ? "Introduce Yourself" : "your city name"
                }
                value={step === 1 ? nameInput : locationInput}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
              />

              <button type="submit" className="sr-only">
                Submit
              </button>
            </form>

            <Image
              src="/media/diamond-light-large.png"
              alt="Diamond Large"
              loading="eager"
              decoding="async"
              width={762}
              height={762}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow rotate-190"
            />

            <Image
              src="/media/diamond-medium-medium.png"
              alt="Diamond Medium"
              loading="lazy"
              decoding="async"
              width={682}
              height={682}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower rotate-185"
            />

            <Image
              src="/media/diamond-dark-small.png"
              alt="Diamond Small"
              loading="lazy"
              decoding="async"
              width={602}
              height={602}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest rotate-185"
            />
          </div>

          <div className="absolute bottom-[38.5px] md:bottom-8 w-full flex justify-between md:px-9 px-13">
            <Link href="/" aria-label="Back">
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold">
                    BACK
                  </span>
                </div>

                <div className="group hidden sm:flex relative items-center">
                  <div className="w-12 h-12 border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] transition" />
                  <span className="absolute left-[15px] bottom-[13px] rotate-180">
                    ▶
                  </span>
                  <span className="text-sm font-semibold ml-6">BACK</span>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}

      {status === "loading" && <Loading />}
      {status === "success" && <Success />}
      {status === "error" && (
        <p className="text-red-500 text-lg">
          An error occurred. Please try again.
        </p>
      )}
    </div>
  );
}
