import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClass =
    "flex justify-center items-center gap-1 font-semibold text-sm rounded-xl transition-colors";

  const sizeClass = {
    sm: "py-1 px-2",
    md: "py-2 px-3",
  }[size];

  const variantClass = {
    primary:
      "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-white/80 hover:text-white active:text-white/60",
    secondary:
      "bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-400 text-black/80 hover:text-black active:text-black/60",
  }[variant];

  const stateClass = disabled
    ? "bg-neutral-600 text-white/60"
    : clsx(variantClass, "cursor-pointer");

  return (
    <button
      className={clsx(baseClass, sizeClass, stateClass, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
