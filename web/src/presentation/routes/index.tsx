import { Loading } from '@/ds';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const Home = lazy(() => import('@/presentation/pages/home'));
const NotFound = lazy(() => import('@/presentation/pages/not-found'));
const Redirect = lazy(() => import('@/presentation/pages/redirect'));

export function BrevlyRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:urlRedirect" element={<Redirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
