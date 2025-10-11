import { Suspense } from 'react';
import { Loading } from '@ds/index';
import Redirect from '@pages/redirect';
import UseCase from '@/domain/usecases/redirect';
import DataSource from '@/data/data-source/redirect';
import HttpClient from '@/infra/http';

const FactoryRedirect = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Redirect useCase={UseCase(new DataSource(new HttpClient()))} />
    </Suspense>
  );
};

export default FactoryRedirect;
