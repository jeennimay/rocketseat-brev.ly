import { useMemo } from 'react';
import './global.css';
import { BrevlyRoutes } from '@/presentation/routes';
import { Toasts } from './presentation/ds';

export function App() {
  return useMemo(
    () => (
      <main className="flex min-h-dvh flex-col items-center justify-center">
        <Toasts />
        <BrevlyRoutes />
      </main>
    ),
    []
  );
}
