import { useEffect, useState } from 'react';
import { concatClassNames } from '@/utils/concat-classname';

export type ToastProps = {
  title: string;
  description?: string;
  variant: 'success' | 'error';
  timeMs?: number;
  onClose?: () => void;
};

const ToastComponent = ({
  title,
  description,
  variant,
  timeMs = 3000,
  onClose,
}: ToastProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(100);

    const timerShowing = setTimeout(() => {
      setProgress(0);
    }, timeMs - 200);

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, timeMs);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerShowing);
    };
  }, [onClose]);

  return (
    <div
      className={concatClassNames(
        'rounded-lg text-gray-600 text-sm leading-sm max-w-3xs w-full overflow-hidden shadow-lg',
        variant === 'success' ? 'bg-green-100' : 'bg-red-100',
        'transform transition-transform duration-200 ease-in-out',
        progress > 1 ? '-translate-x-0' : 'translate-x-full'
      )}
    >
      <div
        id="progress"
        style={{
          width: `calc(${progress}% + 2px)`,
          transition: `width ${timeMs}ms linear`,
        }}
        className={concatClassNames(
          'h-2 rounded-br-sm rounded-tr-sm',
          variant === 'success' ? 'bg-green-500' : 'bg-red-500'
        )}
      />
      <div className="px-4 py-2 box-border">
        <p className="font-bold">{title}</p>
        {!!description && <p className="text-gray-500 mt-2">{description}</p>}
      </div>
    </div>
  );
};

export default ToastComponent;
