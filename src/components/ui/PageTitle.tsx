import { SearchForm } from './SearchForm';

type PageTitleProps = {
  title: string;
  search?: {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
  };
  desc?: string;
  children?: React.ReactNode;
};

export const PageTitle = ({
  title,
  search,
  desc,
  children,
}: PageTitleProps) => {
  return (
    <div className="mb-4 flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-2">
      <div className="flex flex-col items-center gap-2 lg:flex-row lg:items-end">
        <h1 className="text-center text-4xl font-medium text-shadow-lg">
          {title}
        </h1>
        {desc && <span className="text-sm text-white/80">{desc}</span>}
      </div>
      {search && <SearchForm {...search} />}
      {children}
    </div>
  );
};
