"use client";

import { CFImage } from "@/components/ui/CFImage";
import { CONFIG } from "@/config";
import { WeaponDetail } from "@/types/weapons";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type WeaponCardProps = {
  name: string;
  avatar: string;
  rarity: rarityItem;
  type: typeItem;
  skillLabels: string[];
  detail: WeaponDetail | undefined;
  label?: string;
};

type typeItem = {
  id: string;
  name: string;
};

type rarityItem = {
  id: string;
  color: string;
};

export const WeaponCard = ({
  name,
  avatar,
  rarity,
  type,
  skillLabels,
  detail,
  label,
}: WeaponCardProps) => {
  const t = useTranslations("WeaponsPage");

  return (
    <div className="relative flex flex-col group bg-neutral-800 rounded-xl px-2 py-1 gap-2 overflow-hidden">
      <div className="absolute inset-0 group-hover:bg-white/5 transition duration-300 pointer-events-none" />
      <div className="flex gap-2">
        <div
          className={`relative rounded-xl overflow-hidden aspect-square border-b-4 h-24 shrink-0`}
          style={{ borderColor: rarity.color }}
        >
          <div
            className={`absolute inset-1 border border-white/10 rounded-xl`}
          />

          <CFImage
            src={avatar}
            alt={name}
            width={128}
            height={128}
            draggable={false}
            className="absolute inset-0 group-hover:transform group-hover:scale-110 transition duration-300"
          />

          {label && (
            <div
              className={`absolute top-1 left-1 rounded-br-xl rounded-tl-xl p-1 flex justify-center items-center text-xs text-white font-bold select-none ${
                label === "label_type_up" ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {label === "label_type_up" ? "UP" : "NEW"}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 justify-between">
          <p className="font-bold">{name}</p>
          <div>
            <div className="flex gap-1 h-3.5">
              {Array.from({ length: Number(rarity.id.split("_").pop()) }).map(
                (_, i) => (
                  <CFImage
                    key={i}
                    alt="★"
                    width={35}
                    height={37}
                    src={"rarity"}
                    className="object-contain w-fit"
                    isIcon={true}
                  />
                ),
              )}
            </div>
            <div className="text-sm flex gap-1 items-center">
              <CFImage
                alt={type.name}
                width={24}
                height={24}
                src={type.id}
                className="object-contain w-fit h-3.5"
                isIcon={true}
              />{" "}
              <span className="font-semibold">{type.name}</span>
            </div>
          </div>
          <div>
            <p className="text-sm">
              {t("baseATK")}:{" "}
              <span
                className="font-semibold"
                style={{ color: CONFIG.contentColors.light_function_blueness }}
              >
                {detail?.baseATK || "-"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-xs flex flex-col gap-1">
        {skillLabels.map((e, i) => {
          const skills = detail?.skills[i];
          return (
            <div key={e} className="flex gap-1">
              <div>•</div>
              <div>
                <div className="font-semibold">{e}</div>
                {skills && (
                  <div className="my-1">
                    <span className="bg-neutral-900 font-semibold rounded-sm px-1 py-0.5 w-fit h-fit">
                      {skills.label}
                    </span>{" "}
                    {skills.content.map((skill, i) => {
                      const Wrapper = i >= 1 ? "div" : "span";
                      return (
                        <Wrapper
                          key={i}
                          className={i >= 1 ? "mt-2" : undefined}
                        >
                          {skill.map((content, j) => (
                            <span
                              key={j}
                              className={clsx(
                                content.bold && "font-semibold",
                                content.underline && "underline",
                              )}
                              style={{
                                color:
                                  CONFIG.contentColors[
                                    content.color as keyof typeof CONFIG.contentColors
                                  ],
                              }}
                            >
                              {content.text.text}
                            </span>
                          ))}
                        </Wrapper>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
