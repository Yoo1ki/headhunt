"use client";

import { useEffect, useState } from "react";
import { SlMenu, SlClose } from "react-icons/sl";
import { MobileNavbar } from "./MobileNavbar";
import { Link } from "@/i18n/navigation";
import { SwitchLocale } from "./SwitchLocale";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`bg-neutral-800 shadow-sm w-full flex items-center ${className}`}
      >
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold overflow-hidden text-yellow-400"
            >
              <h1>Headhunt.cc</h1>
            </Link>
            <div className="flex gap-4 items-center">
              <SwitchLocale />
              <div
                onClick={onClick}
                className="lg:hidden cursor-pointer text-white"
              >
                {isOpen ? (
                  <SlClose className="w-8 h-8" />
                ) : (
                  <SlMenu className="w-8 h-8" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`${!isOpen && "hidden"} transition-all duration-300`}>
        <MobileNavbar onClick={onClick} />
      </div>
    </>
  );
};
