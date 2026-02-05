import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]">
      <div className="flex flex-row pt-1 scale-75 justify-center items-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-[1000]"
        >
          SKINSTRIC
        </Link>
        <img
          className="w-[4px] h-[17px]"
          src="/icons/RectangleLeft.svg"
          alt="left-bracket"
          loading="lazy"
          width={5}
          height={19}
        />
        <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">
          INTRO
        </p>
        <img
          className="w-[4px] h-[17px]"
          src="/icons/RectangleRight.svg"
          alt="right-bracket"
          loading="lazy"
          width={5}
          height={19}
        />
      </div>
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
        ENTER CODE
      </button>
    </div>
  );
}
