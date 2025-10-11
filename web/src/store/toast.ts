import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { ToastProps } from '@/presentation/ds/atoms/toast/toast';

type ToastState = {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  removeToast: (index: number) => void;
};

export const useToast = create<ToastState, [['zustand/immer', never]]>(
  immer(set => ({
    toasts: [],
    addToast: toast =>
      set(state => {
        state.toasts.push(toast);
        return state;
      }),
    removeToast: index =>
      set(state => {
        state.toasts.splice(index, 1);
        return state;
      }),
  }))
);
