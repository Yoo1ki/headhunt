'use client';

import { Navbar } from './Navbar';

type MobileNavbarProps = {
  isOpen: boolean;
  onClick?: () => void;
};

export const MobileNavbar = ({ isOpen, onClick }: MobileNavbarProps) => {
  return (
    <nav
      id="mobile-navigation"
      aria-hidden={!isOpen}
      inert={!isOpen}
      onClick={onClick}
      className={`fixed top-14 right-0 bottom-0 left-0 z-40 bg-black/50 backdrop-blur-sm transition-[opacity,visibility] duration-200 ease-out motion-reduce:transition-none lg:hidden ${isOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'}`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`absolute inset-2 rounded-xl bg-neutral-800/90 transition-transform duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isOpen ? 'translate-y-0' : '-translate-y-3'}`}
      >
        <Navbar onClick={onClick} />
      </div>
    </nav>
  );
};
