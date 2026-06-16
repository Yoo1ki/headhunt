'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

export const GoToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const container = document.getElementById('scroll-container');

    const getScrollTop = () => {
      if (container && window.innerWidth >= 1024) {
        return container.scrollTop;
      }
      return window.scrollY;
    };

    const handleScroll = () => {
      setShow(getScrollTop() > 300);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const container = document.getElementById('scroll-container');

    if (container && window.innerWidth >= 1024) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-5 bottom-5 z-50 cursor-pointer rounded-full bg-white/5 px-2.5 py-2.5 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'} `}
    >
      <div className="absolute inset-0.5 rounded-full ring-1 ring-white/10" />
      <FaArrowUp />
    </button>
  );
};
