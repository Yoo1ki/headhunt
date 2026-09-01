'use client';

import type { ReactNode } from 'react';
import { useState, useRef, useLayoutEffect } from 'react';

type TabsProps = {
  tabs: string[];
  children: ReactNode[];
};

export const Tabs = ({ tabs, children }: TabsProps) => {
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const [style, setStyle] = useState({
    width: 0,
    height: 0,
    left: 0,
  });

  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const calculate = () => {
      const el = refs.current;
      if (!el.length) return;

      const totalWidth = el.reduce((sum, e) => sum + (e?.offsetWidth ?? 0), 0);
      const parentWidth = el[0]?.parentElement?.offsetWidth ?? 0;
      const newWidth = totalWidth > parentWidth ? totalWidth : parentWidth;

      setWidth((prev) => (prev !== newWidth ? newWidth : prev));

      const activeEl = el[active];
      if (!activeEl) return;

      const newStyle = {
        width: activeEl.offsetWidth,
        height: activeEl.offsetHeight,
        left: activeEl.offsetLeft,
      };

      setStyle((prev) =>
        prev.width !== newStyle.width ||
        prev.height !== newStyle.height ||
        prev.left !== newStyle.left
          ? newStyle
          : prev
      );
    };

    calculate();

    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [active]);

  return (
    <div className="w-full">
      <div className="scrollbar-hide relative my-2 flex overflow-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            className={`cursor-pointer px-4 py-2 font-semibold transition-colors ${
              active === i ? 'text-yellow-500' : 'text-white/80'
            }`}
          >
            {tab}
          </button>
        ))}

        <span
          className="absolute bottom-0 h-0.5 rounded-xl bg-white/50"
          style={{ width }}
        />

        <span
          className="absolute bottom-0 rounded-t-xl border-b-2 border-yellow-500 bg-white/10 transition-all duration-300"
          style={{
            width: style.width,
            height: style.height,
            left: style.left,
          }}
        />
      </div>

      {children[active]}
    </div>
  );
};
