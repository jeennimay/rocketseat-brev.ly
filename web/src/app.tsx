import './global.css';
import { BrevlyRoutes } from './presentation/routes';

export function App() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center">
      <BrevlyRoutes />
    </main>
  );
}
