"use client";

import { useEffect, useState } from "react";

export function useHash(defaultValue = "special", validValues?: string[]) {
  const [hash, setHash] = useState(defaultValue);

  useEffect(() => {
    const getValidHash = () => {
      let current = window.location.hash.replace("#", "");

      if (!current || (validValues && !validValues.includes(current))) {
        current = defaultValue;
        window.history.replaceState(null, "", `#${current}`);
      }

      return current;
    };

    const handleHashChange = () => {
      setHash(getValidHash());
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [defaultValue, validValues]);

  return hash;
}
