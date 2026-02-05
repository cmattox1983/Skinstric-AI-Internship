"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Summary() {
  const [data, setData] = useState({ race: {}, age: {}, gender: {} });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("demographicData");
    if (stored) setData(JSON.parse(stored));
    setLoaded(true);
  }, []);

  const [selectedRows, setSelectedRows] = useState({
    race: null,
    age: null,
    gender: null,
  });
  const [activeSection, setActiveSection] = useState("race");

  const sections = ["race", "age", "gender"];

  const getAgeStart = (label) => {
    const start = parseInt(String(label).split("-")[0], 10);
    return Number.isNaN(start) ? Infinity : start;
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const titleCase = (str) => {
    return str.split(" ").map(capitalizeFirst).join(" ");
  };

  const listsBySection = Object.fromEntries(
    sections.map((section) => {
      const rawEntries = Object.entries(data?.[section] ?? {});

      const sortedEntries =
        section === "age"
          ? rawEntries.sort((a, b) => getAgeStart(a[0]) - getAgeStart(b[0]))
          : rawEntries.sort((a, b) => b[1] - a[1]);

      const entries = sortedEntries.map(([label, value]) => ({
        label,
        labelDisplay:
          section === "race"
            ? titleCase(label)
            : section === "gender"
              ? label.toUpperCase()
              : section === "age"
                ? label
                : label,
        value,
        percent: Math.round(Number(value) * 100),
      }));

      return [section, entries];
    }),
  );

  useEffect(() => {
    if (!loaded) return;

    setSelectedRows((prev) => {
      const alreadySet = sections.every((section) => prev[section]);
      if (alreadySet) return prev;

      const next = { ...prev };

      sections.forEach((section) => {
        const rows = listsBySection[section] ?? [];
        if (rows.length === 0) return;

        const maxRow = rows.reduce((best, current) =>
          current.percent > best.percent ? current : best,
        );

        next[section] = next[section] ?? maxRow;
      });

      return next;
    });
  }, [loaded, listsBySection]);

  const rows = listsBySection[activeSection] ?? [];
  const activeRow = selectedRows[activeSection];

  return (
    <>
      <div className="h-[90vh] md:h-[90vh] flex flex-col md:mt-5">
        <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
          <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
            <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
              <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
                A.I. ANALYSIS
              </h2>
              <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
                DEMOGRAPHICS
              </h3>
              <h4 className="text-sm mt-2 leading'[24px]">
                PREDICTED RACE & AGE
              </h4>
            </div>

            <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
                <div
                  className={
                    activeSection === "race"
                      ? "p-3 cursor-pointer bg-[#1A1B1C] text-white hover:bg-black flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-solid border-[#1A1B1C]"
                      : "p-3 cursor-pointer bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-solid border-[#1A1B1C]"
                  }
                  onClick={() => setActiveSection("race")}
                >
                  <p className="text-base font-semibold">
                    {selectedRows.race?.labelDisplay}
                  </p>
                  <h4 className="text-base font-semibold mb-1">RACE</h4>
                </div>

                <div
                  className={
                    activeSection === "age"
                      ? "p-3 cursor-pointer bg-[#1A1B1C] text-white hover:bg-black flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-solid border-[#1A1B1C]"
                      : "p-3 cursor-pointer bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-solid border-[#1A1B1C]"
                  }
                  onClick={() => setActiveSection("age")}
                >
                  <p className="text-base font-semibold">
                    {selectedRows.age?.labelDisplay}
                  </p>
                  <h4 className="text-base font-semibold mb-1">AGE</h4>
                </div>

                <div
                  className={
                    activeSection === "gender"
                      ? "p-3 cursor-pointer bg-[#1A1B1C] text-white hover:bg-black flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-solid border-[#1A1B1C]"
                      : "p-3 cursor-pointer bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-solid border-[#1A1B1C]"
                  }
                  onClick={() => setActiveSection("gender")}
                >
                  <p className="text-base font-semibold">
                    {selectedRows.gender?.labelDisplay}
                  </p>
                  <h4 className="text-base font-semibold mb-1">SEX</h4>
                </div>
              </div>

              <div className="relative bg-gray-100 pt-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t md:border-solid md:border-[#1A1B1C]">
                <p className="hidden md:block md:absolute text-[40px] mb-2 left-7 top-4">
                  {activeRow?.labelDisplay}
                </p>

                <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "384px",
                      position: "relative",
                      transform: "scale(1)",
                      transformOrigin: "center center",
                    }}
                  >
                    <CircularProgressbar
                      value={activeRow?.percent}
                      text=""
                      strokeWidth={1.7}
                      styles={{
                        path: {
                          stroke: "#1A1B1C",
                          strokeLinecap: "butt",
                          transitionDuration: "0.8s",
                        },
                        trail: {
                          stroke: "#C1C2C3",
                          strokeLinecap: "butt",
                        },
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-3xl md:text-[40px] font-normal">
                        {activeRow?.percent}
                        <span className="absolute text-xl md:text-3xl">%</span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                  If A.I. estimate is wrong, select the correct one.
                </p>
              </div>

              <div className="bg-gray-100 pt-4 pb-4 md:border-t md:border-solid md:border-[#1A1B1C]">
                <div className="space-y-0">
                  <div className="flex justify-between px-4">
                    <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                      {activeSection === "race" && "RACE"}
                      {activeSection === "age" && "AGE"}
                      {activeSection === "gender" && "SEX"}
                    </h4>
                    <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                      A.I. CONFIDENCE
                    </h4>
                  </div>

                  {rows.map((row) => {
                    const isActive =
                      selectedRows[activeSection]?.label === row.label;
                    const radioButton = isActive
                      ? "/media/radio-button.png"
                      : "/media/radio-button-outline.png";

                    return (
                      <div
                        key={row.label}
                        onClick={() =>
                          setSelectedRows((prev) => ({
                            ...prev,
                            [activeSection]: row,
                          }))
                        }
                        className={`flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer ${
                          isActive
                            ? "bg-[#1A1B1C] text-white hover:bg-black"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Image
                            src={radioButton}
                            alt="radio button"
                            loading="lazy"
                            width={12}
                            height={12}
                            decoding="async"
                            style={{ color: "transparent" }}
                            className="w-[12px] h-[12px] mr-2"
                          />
                          <span className="font-normal text-base leading-6 tracking-tight">
                            {row.labelDisplay}
                          </span>
                        </div>

                        <span className="font-normal text-base leading-6 tracking-tight">
                          {row.percent}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
              <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
                <Link href="/select">
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

                <Link href="/">
                  <div>
                    <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                      <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                        HOME
                      </span>
                    </div>

                    <div className="hidden sm:flex flex-row relative justify-center items-center">
                      <span className="text-sm font-semibold hidden sm:block mr-5">
                        HOME
                      </span>
                      <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85]"></div>
                      <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block">
                        ▶
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Summary;
