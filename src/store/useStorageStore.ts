"use client";

import LZString from "lz-string";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Profile } from "@/types/profile";

type StorageState = {
  profiles: Record<string, Profile>;
  currentProfileId: string;
  hasHydrated: boolean;

  getCurrentProfile: () => Profile | null;
  setProfile: (profile: Omit<Profile, "id"> & { id?: string }) => void;
  setCurrentProfileId: (id: string) => void;
  removeProfile: (id: string) => void;
};

const storage = {
  getItem: (name: string) => {
    const compressed = localStorage.getItem(name);
    if (!compressed) return null;

    return LZString.decompressFromUTF16(compressed);
  },

  setItem: (name: string, value: string) => {
    const compressed = LZString.compressToUTF16(value);
    localStorage.setItem(name, compressed);
  },

  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useStorageStore = create<StorageState>()(
  persist(
    (set, get) => ({
      profiles: {},
      currentProfileId: "",
      hasHydrated: false,

      getCurrentProfile: () => {
        const { profiles, currentProfileId } = get();
        return profiles[currentProfileId] || null;
      },

      setProfile: (profile) => {
        set((state) => {
          const maxId = Object.keys(state.profiles)
            .map((k) => parseInt(k, 10))
            .reduce((a, b) => Math.max(a, b), 0);

          const id = profile.id || (maxId + 1).toString();

          return {
            profiles: {
              ...state.profiles,
              [id]: { ...profile, id },
            },
            currentProfileId: id,
          };
        });
      },

      setCurrentProfileId: (id) => {
        set({ currentProfileId: id });
      },

      removeProfile: (id) => {
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...rest } = state.profiles;
          let newCurrentId = state.currentProfileId;

          // jika profile yang dihapus adalah current, set ke id terkecil yang ada
          if (state.currentProfileId === id) {
            const remainingIds = Object.keys(rest).sort((a, b) => +a - +b);
            newCurrentId = remainingIds[0] || "";
          }

          return {
            profiles: rest,
            currentProfileId: newCurrentId,
          };
        });
      },
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => storage),

      partialize: (state) => ({
        profiles: state.profiles,
        currentProfileId: state.currentProfileId,
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        state.hasHydrated = true;

        if (
          !state.currentProfileId ||
          Object.keys(state.profiles).length === 0
        ) {
          state.setProfile({ id: "1", name: "Endministrator", stores: {} });
          state.setCurrentProfileId("1");
        }
      },
    },
  ),
);
