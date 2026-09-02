'use client';

import { create } from 'zustand';
import type {
  GoogleDriveBackupFile,
  GoogleDriveSession,
} from '@/lib/google-drive-backup';
import type { TrackerBackup } from '@/lib/tracker-backup';

export type GoogleDriveStatus =
  | 'connecting'
  | 'backingUp'
  | 'restoring'
  | 'driveBackedUp'
  | 'driveOutdated'
  | 'driveError'
  | 'driveNotFound'
  | 'reconnectRequired'
  | null;

type GoogleDriveState = {
  session: GoogleDriveSession | null;
  backups: GoogleDriveBackupFile[];
  initialBackup: GoogleDriveBackupFile | null;
  initialBackupData: TrackerBackup | null;
  status: GoogleDriveStatus;
  sessionCheckAttempted: boolean;
  setSession: (session: GoogleDriveSession | null) => void;
  setBackups: (
    value:
      | GoogleDriveBackupFile[]
      | ((backups: GoogleDriveBackupFile[]) => GoogleDriveBackupFile[])
  ) => void;
  setInitialBackup: (backup: GoogleDriveBackupFile | null) => void;
  setInitialBackupData: (backup: TrackerBackup | null) => void;
  setStatus: (status: GoogleDriveStatus) => void;
  setSessionCheckAttempted: (attempted: boolean) => void;
  reset: () => void;
};

const initialState = {
  session: null,
  backups: [],
  initialBackup: null,
  initialBackupData: null,
  status: null,
  sessionCheckAttempted: false,
} satisfies Pick<
  GoogleDriveState,
  | 'session'
  | 'backups'
  | 'initialBackup'
  | 'initialBackupData'
  | 'status'
  | 'sessionCheckAttempted'
>;

export const useGoogleDriveStore = create<GoogleDriveState>((set) => ({
  ...initialState,
  setSession: (session) => set({ session }),
  setBackups: (value) =>
    set((state) => ({
      backups: typeof value === 'function' ? value(state.backups) : value,
    })),
  setInitialBackup: (initialBackup) => set({ initialBackup }),
  setInitialBackupData: (initialBackupData) => set({ initialBackupData }),
  setStatus: (status) => set({ status }),
  setSessionCheckAttempted: (sessionCheckAttempted) =>
    set({ sessionCheckAttempted }),
  reset: () => set(initialState),
}));
