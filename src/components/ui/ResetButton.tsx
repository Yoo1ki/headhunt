import { BiReset } from 'react-icons/bi';
import { Button } from './Button';

type ResetButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export const ResetButton = ({ disabled, onClick }: ResetButtonProps) => {
  return (
    <Button onClick={onClick} className={`h-10 grow`} disabled={disabled}>
      <BiReset
        size={18}
        className={`${disabled && 'rotate-45'} transition duration-300`}
      />
      <span>Reset</span>
    </Button>
  );
};
