import Warning from '@/ds/quarks/icons/warning';
import { concatClassNames } from '@/utils/concat-classname';
import { type FC } from 'react';

export type InputProps = {
  label?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  name,
  label,
  className,
  errorMessage,
  ...props
}) => {
  const style = {
    inputError: 'border-2 border-danger focus:border-2 focus:border-danger',
    inputFocus: 'border-gray-300 focus:border-2 focus:border-blue-base',
    labelFocus: 'text-gray-500 peer-focus:text-blue-base peer-focus:font-bold',
    labelError: 'text-danger font-bold',
  };

  return (
    <div className={concatClassNames('flex flex-col-reverse gap-2', className)}>
      {errorMessage && (
        <span className="text-sm leading-sm text-gray-500 flex items-center gap-2">
          <Warning size={16} color="danger" />
          {errorMessage}
        </span>
      )}
      <input
        className={`peer block min-w-0 w-full h-12 px-4 border rounded-lg text-md leading-md text-gray-600 placeholder-gray-400  outline-none transition-colors duration-300 ${
          errorMessage ? style.inputError : style.inputFocus
        }`}
        name={name}
        id={name}
        {...props}
      />
      {label && (
        <label
          htmlFor={name}
          className={`text-xs leading-xs uppercase block hover:not-disabled:cursor-pointer  transition-colors duration-300 ${
            errorMessage ? style.labelError : style.labelFocus
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
