import { SearchForm } from './SearchForm';

type PageTitleProps = {
  title: string;
  search?: {
    placeholder?: string;
    ariaLabel?: string;
    value: string;
    onChange: (value: string) => void;
  };
  desc?: string;
  descPosition?: 'below' | 'right';
  centered?: boolean;
  children?: React.ReactNode;
};

export const PageTitle = ({
  title,
  search,
  desc,
  descPosition = 'below',
  centered = false,
  children,
}: PageTitleProps) => {
  return (
    <div
      className={`mb-4 flex flex-col gap-4 sm:mb-6 ${centered ? 'items-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}
    >
      <div
        className={`flex min-w-0 flex-col items-center gap-2 ${centered ? '' : 'lg:items-start'}`}
      >
        <h1
          className={`text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl ${centered ? '' : 'lg:text-left'}`}
        >
          {title}
        </h1>
        {desc && descPosition === 'below' && (
          <span
            className={`max-w-2xl text-center text-sm leading-relaxed text-white/55 ${centered ? '' : 'lg:text-left'}`}
          >
            {desc}
          </span>
        )}
      </div>
      {desc && descPosition === 'right' && (
        <span className="max-w-2xl text-center text-sm leading-relaxed text-white/55 lg:max-w-xl lg:text-right">
          {desc}
        </span>
      )}
      {(search || children) && (
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          {search && <SearchForm {...search} />}
          {children}
        </div>
      )}
    </div>
  );
};
