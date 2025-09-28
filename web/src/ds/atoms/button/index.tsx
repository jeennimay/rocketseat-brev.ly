import type { ReactNode, FC, ButtonHTMLAttributes } from 'react';
import { concatClassNames } from '@utils/concat-classname';

export type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  block?: boolean;
  isOnlyIcon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  block = false,
  isOnlyIcon = false,
  className,
  ...props
}) => {
  const styles = {
    button:
      'rounded font-semibold transition-colors duration-300 border-[1px] border-transparent focus:outline-none hover:not-disabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
    block: 'w-full',
    primary:
      'bg-blue-base text-white text-md leading-md px-5 min-h-12 hover:not-disabled:bg-blue-dark',
    secondary:
      'bg-gray-200 text-gray-500 text-sm leading-sm px-2 min-h-8 hover:not-disabled:bg-gray-200 hover:not-disabled:border-blue-base hover:not-disabled:border-[1px]',
    onlyIcon: 'min-w-8 p-0 min-h-8 flex items-center justify-center',
  };
  return (
    <button
      className={concatClassNames(
        styles.button,
        block && styles.block,
        styles[variant],
        isOnlyIcon && styles.onlyIcon,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
