import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import React from 'react';

type SettingsMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsMenu = ({ isOpen, onClose }: SettingsMenuProps) => {
  const handleBackup = () => {};

  const handleRestore = () => {};

  return (
    <Modal title="Settings" isOpen={isOpen} onClose={onClose}>
      <div className="border-t border-white/80" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Backup Records</div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleBackup}>
              Backup
            </Button>
            <Button variant="primary" onClick={handleRestore}>
              Restore
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
