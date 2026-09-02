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
    <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex min-w-0 flex-col items-center gap-1 lg:items-start">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-left">
          {title}
        </h1>
        {desc && (
          <span className="text-center text-sm text-white/55 lg:text-left">
            {desc}
          </span>
        )}
      </div>
      {(search || children) && (
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          {search && <SearchForm {...search} />}
          {children}
        </div>
      )}
    </div>
  );
};
