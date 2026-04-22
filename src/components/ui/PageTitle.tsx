import { SearchForm } from "./SearchForm";

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
    <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:gap-2 items-center justify-between">
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-2">
        <h1 className="text-4xl text-shadow-lg font-medium text-center">
          {title}
        </h1>
        {desc && <span className="text-sm text-white/80">{desc}</span>}
      </div>
      {search && <SearchForm {...search} />}
      {children}
    </div>
  );
};
