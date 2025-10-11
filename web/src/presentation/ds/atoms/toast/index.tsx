import { useToast } from '@/store/toast';
import ToastComponent from './toast';

const Toasts = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast, index) => (
        <ToastComponent
          key={index}
          {...toast}
          onClose={() => removeToast(index)}
        />
      ))}
    </div>
  );
};

export default Toasts;
