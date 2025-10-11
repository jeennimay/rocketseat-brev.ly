import { lazy, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router';
import { Loading } from '@ds/index';

const Home = lazy(() => import('@factories/home'));
const NotFound = lazy(() => import('@factories/not-found'));
const Redirect = lazy(() => import('@factories/redirect'));

export function BrevlyRoutes() {
  return useMemo(
    () => (
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:urlRedirect" element={<Redirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    ),
    []
  );
}
