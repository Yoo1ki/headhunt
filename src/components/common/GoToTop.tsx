"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export const GoToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container");

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
      container.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const container = document.getElementById("scroll-container");

    if (container && window.innerWidth >= 1024) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-5 right-5 z-50
        px-2.5 py-2.5 rounded-full
        bg-white/5 text-white
        shadow-lg
        transition-all duration-300
        hover:bg-white/10
        cursor-pointer backdrop-blur-sm
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <div className="absolute inset-0.5 ring-1 ring-white/10 rounded-full" />
      <FaArrowUp />
    </button>
  );
};
