"use client";

export default function NavigationItem() {
  return (
    <button className="relative flex justify-center w-full transition-all group">
      <div className="absolute w-[0] group-hover:w-1 h-4 transition-all bg-white rounded-r-full left-0 top-[50%] translate-y-[-50%]" />
      <div className="w-14 h-14 bg-zinc-800 rounded-3xl transition-all duration-500 hover:rounded-2xl cursor-pointer"></div>
    </button>
  );
}
