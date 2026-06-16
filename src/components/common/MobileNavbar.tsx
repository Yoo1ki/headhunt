'use client';

import { Navbar } from './Navbar';

type MobileNavbarProps = {
  onClick?: () => void;
};

export const MobileNavbar = ({ onClick }: MobileNavbarProps) => {
  return (
    <nav className="fixed top-14 right-0 bottom-0 left-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden">
      <div className="absolute inset-2 rounded-xl bg-neutral-800/90">
        <Navbar onClick={onClick} />
      </div>
    </nav>
  );
};
