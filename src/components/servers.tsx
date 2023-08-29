import Image from "next/image";

export default function Servers() {
  return (
    <div className="w-24 overflow-y-scroll custom-scrollbar pb-3">
      <div className="w-14 mx-auto space-y-3">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl center">
          <Image
            src="/images/discord-icon.png"
            alt="discord icon"
            width={30}
            height={30}
          />
        </div>
        {new Array(10).fill(0).map((item) => (
          <div className="w-14 h-14 bg-zinc-800 rounded-full"></div>
        ))}
      </div>
    </div>
  );
}
