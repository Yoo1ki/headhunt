import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type LoadingProps = {
  label: string;
};

export const Loading = ({ label }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <AiOutlineLoading3Quarters size={32} className="animate-spin" />
      <p>{label}</p>
    </div>
  );
};
