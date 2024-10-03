import { DetailsPage } from '@/components/GovernPage/SubComponent/DetailsPage';
import { Suspense } from 'react';

export function Detail() {
  return (
    <Suspense>
      <DetailsPage />
    </Suspense>
  );
}
