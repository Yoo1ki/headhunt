import clsx from "clsx";
import { CFImage } from "@/components/ui/CFImage";

type TypeCardProps = {
  hash: string;
  name: string;
  icon: string;
  subIcons?: string[];
  pity5: number;
  pity6: number;
  pity5Limit: number;
  pity6Limit: number;
  isSelected: boolean;
};

export const TypeCard = ({
  hash,
  name,
  icon,
  subIcons,
  pity5,
  pity6,
  pity5Limit,
  pity6Limit,
  isSelected,
}: TypeCardProps) => {
  const borderColor = isSelected
    ? "border-yellow-500 bg-neutral-700/80"
    : "border-transparent bg-neutral-800/80";

  return (
    <a
      className={clsx(
        "border-2 flex hover:bg-neutral-700/80 rounded-xl overflow-hidden transition duration-300",
        borderColor,
      )}
      href={`#${hash}`}
    >
      <div className="flex items-end">
        <CFImage
          src={icon}
          alt={name}
          width={100}
          height={100}
          draggable={false}
        />
      </div>
      <div className="flex flex-1 pl-1 pr-3 py-2">
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <p className="font-bold">{name}</p>
          {subIcons ? (
            <div className="flex gap-1">
              {subIcons.map((icon, index) => (
                <CFImage
                  key={index}
                  src={icon}
                  alt={`Weapon ${index + 1}`}
                  width={50}
                  height={50}
                  draggable={false}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex justify-between items-center rounded-lg text-[#FF7100]">
                <CFImage
                  src="rarity_6"
                  alt={"6★"}
                  width={54}
                  height={29}
                  draggable={false}
                  className="w-8"
                  isIcon={true}
                />
                <div>
                  {pity6}/{pity6Limit}
                </div>
              </div>
              <div className="flex justify-between items-center rounded-lg text-[#FFC000]">
                <CFImage
                  src="rarity_5"
                  alt={"5★"}
                  width={54}
                  height={29}
                  draggable={false}
                  className="w-8"
                  isIcon={true}
                />
                <div>
                  {pity5}/{pity5Limit}
                </div>
              </div>
            </div>
            // <div className="flex gap-2">
            //   <div className="flex flex-1 flex-col items-center rounded-xl bg-neutral-900/80 px-2 py-1">
            //     <div className="flex gap-1 justify-center items-center">
            //       <div className="text-sm font-semibold text-center text-white line-clamp-1">
            //         5
            //       </div>
            //       <CFImage
            //         src="rarity"
            //         alt={"5★"}
            //         width={24}
            //         height={24}
            //         draggable={false}
            //         className="w-4"
            //         isIcon={true}
            //       />
            //     </div>
            //     <div className="text-[#FFC000]">
            //       {pity5}/{pity5Limit}
            //     </div>
            //   </div>
            //   <div className="flex flex-1 flex-col items-center rounded-xl bg-neutral-900/80 px-2 py-1">
            //     <div className="flex gap-1 justify-center items-center">
            //       <div className="text-sm font-semibold text-center text-white line-clamp-1">
            //         6
            //       </div>
            //       <CFImage
            //         src="rarity"
            //         alt={"5★"}
            //         width={24}
            //         height={24}
            //         draggable={false}
            //         className="w-4"
            //         isIcon={true}
            //       />
            //     </div>
            //     <div className="text-[#FF7100]">
            //       {pity6}/{pity6Limit}
            //     </div>
            //   </div>
            // </div>
          )}
        </div>
      </div>
    </a>
  );
};
