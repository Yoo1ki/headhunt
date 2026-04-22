"use client";

export const PageContent = () => {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold text-white">Headhunt.cc</h1>
        <div className="text-xl text-center">
          Free tool to track your gacha pity in Arknights: Endfield. Check pull
          history and pity count easily.
        </div>
      </div>
      <div className="flex flex-col grow justify-center items-center gap-4">
        <div className="px-3 py-2 border-2 border-yellow-400/80 text-yellow-400 rounded-xl text-center text-lg">
          Website under development
        </div>
        {/* <h2 className="text-lg font-bold">Limited Banners</h2>
        <div className="flex justify-center items-center gap-4 w-full">
          <div className="relative w-full h-auto rounded-xl ring-2 ring-neutral-700/80 bg-neutral-800 overflow-hidden">
            <div className="bg-neutral-900 w-fit rounded-br-xl">
              <Image
                src="/assets/3e8cb366c87400f771b0d7612da686c7cd4c64a13a3de359ae939da8e79a9cf7.png"
                alt="example"
                width={100}
                height={100}
                draggable={false}
                className="object-contain scale-110"
              />
            </div>
            <div className="absolute right-0 top-0 bg-neutral-700/80 rounded-bl-xl px-2 py-0.5 flex justify-center items-center gap-1">
              <span className="text-xs font-semibold">Rossi</span>
            </div>
          </div>
          <div className="relative h-32 w-full rounded-xl ring-2 ring-neutral-700/80 bg-neutral-800 overflow-hidden">
            <div className="absolute h-full w-32 top-10 left-0">
              <Image
                src="/assets/5cd693d996f90f160429daa2ff2b756163d6d86856444c85fefeabf6b4a1aeed.png"
                alt="example"
                fill
                sizes="256px"
                draggable={false}
                className="object-cover scale-200"
              />
            </div>
            <div className="absolute right-0 top-0 bg-neutral-700/80 rounded-bl-xl px-2 py-0.5 flex justify-center items-center gap-1">
              <span className="text-xs font-semibold">Rossi</span>
            </div>
            <div className="absolute bottom-1 left-1 right-1 bg-neutral-900/80 rounded-xl px-2 py-0.5 flex justify-center items-center">
              <span className="text-sm font-semibold">Nama Banner Ini</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
