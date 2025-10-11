import { Suspense } from 'react';
import { Loading } from '@ds/index';
import NotFound from '@pages/not-found';

const FactoryNotFound = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NotFound />
    </Suspense>
  );
};

export default FactoryNotFound;
