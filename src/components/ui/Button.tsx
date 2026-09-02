import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
  isNew?: boolean;
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isNew = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClass =
    'relative flex justify-center items-center gap-1 font-semibold text-sm rounded-xl transition-colors duration-150';

  const sizeClass = {
    sm: 'py-1 px-2',
    md: 'py-2 px-3',
  }[size];

  const variantClass = {
    primary:
      'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-neutral-950 hover:text-black active:text-black/70 shadow-sm shadow-yellow-950/20',
    secondary:
      'bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-400 text-black/80 hover:text-black active:text-black/60',
    danger:
      'bg-red-500 hover:bg-red-400 active:bg-red-600 text-white/90 hover:text-white active:text-white/70',
  }[variant];

  const stateClass = disabled
    ? 'bg-neutral-600 text-white/50 shadow-none'
    : clsx(variantClass, 'cursor-pointer');

  return (
    <button
      className={clsx(baseClass, sizeClass, stateClass, className)}
      disabled={disabled}
      {...props}
    >
      {isNew && (
        <span className="absolute -top-2 -right-2 rounded-full border border-red-300/40 bg-red-500 px-1.5 py-0.5 text-[10px] leading-none font-bold tracking-wide text-white shadow-md shadow-red-950/30">
          NEW
        </span>
      )}

      {children}
    </button>
  );
};
