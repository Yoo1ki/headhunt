import clsx from 'clsx';
import { CFImage } from '@/components/ui/CFImage';

type TypeCardProps = {
  hash: string;
  name: string;
  icons: IconItem[];
  pity5: number;
  pity6: number;
  pity5Limit: number;
  pity6Limit: number;
  isSelected: boolean;
};

type IconItem = {
  name: string;
  url: string;
};

export const TypeCard = ({
  hash,
  name,
  icons,
  pity5,
  pity6,
  pity5Limit,
  pity6Limit,
  isSelected,
}: TypeCardProps) => {
  const borderColor = isSelected
    ? 'border-yellow-500 bg-neutral-700/80'
    : 'border-transparent bg-neutral-800/80';

  const content = (
    <>
      <div className="flex items-end">
        {hash !== 'weponbox' ? (
          hash === 'joint' ? (
            <div className="relative grid h-25 w-25 grid-cols-2">
              {icons.map((icon, index) => (
                <CFImage
                  key={index}
                  src={icon.url}
                  alt={icon.name}
                  width={50}
                  height={50}
                  draggable={false}
                />
              ))}
            </div>
          ) : (
            <div className="relative h-25 w-25">
              <CFImage
                src={icons[0].url}
                alt={icons[0].name}
                width={100}
                height={100}
                draggable={false}
                className="absolute inset-0"
              />
              {icons.length > 1 && (
                <div className="absolute right-0 bottom-0 left-0 flex justify-center gap-2">
                  {icons.slice(1).map((icon, index) => (
                    <CFImage
                      key={index}
                      src={icon.url}
                      alt={icon.name}
                      width={32}
                      height={32}
                      draggable={false}
                      className="rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>
          )
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-1 py-2 pr-3 pl-1">
        <div
          className={`flex flex-1 flex-col justify-between gap-1 ${hash === 'weponbox' ? 'items-center' : ''}`}
        >
          <p className="font-bold">{name}</p>
          {hash === 'weponbox' ? (
            <div className="flex gap-1">
              {icons.map((icon, index) => (
                <CFImage
                  key={index}
                  src={icon.url}
                  alt={icon.name}
                  width={48}
                  height={48}
                  draggable={false}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center justify-between rounded-lg text-[#FF7100]">
                <CFImage
                  src="rarity_6"
                  alt={'6★'}
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
              <div className="flex items-center justify-between rounded-lg text-[#FFC000]">
                <CFImage
                  src="rarity_5"
                  alt={'5★'}
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
          )}
        </div>
      </div>
    </>
  );

  if (hash === 'rerun') {
    return (
      <div className="flex overflow-hidden rounded-xl bg-neutral-800/80">
        {content}
      </div>
    );
  }

  return (
    <a
      className={clsx(
        'flex overflow-hidden rounded-xl border-2 transition duration-300 hover:bg-neutral-700/80',
        borderColor
      )}
      href={`#${hash}`}
    >
      {content}
    </a>
  );
};
