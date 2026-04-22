"use client";

import { Navbar } from "./Navbar";

type MobileNavbarProps = {
  onClick?: () => void;
};

export const MobileNavbar = ({ onClick }: MobileNavbarProps) => {
  return (
    <nav className="bg-black/50 backdrop-blur-sm fixed top-14 bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-neutral-800/90 absolute inset-2 rounded-xl py-4">
        <Navbar onClick={onClick} />
      </div>
    </nav>
  );
};
