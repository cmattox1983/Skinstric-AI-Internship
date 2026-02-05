import React from "react";

function AnalyzeImage() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-[#FCFCFC] opacity-50 p-6 rounded-lg shadowlg text-center">
          <p className="text-xl animate-pulse">ANALYZING IMAGE...</p>
          <div className="flex items-center justify-center space-x-4 py-8">
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_0ms] opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_250ms] opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_500ms] opacity-30"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalyzeImage;
