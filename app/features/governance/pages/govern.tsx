import { GovernPage } from '@/components/GovernPage';
import { Suspense } from 'react';

export function Govern() {
  return (
    <Suspense>
      <GovernPage />
    </Suspense>
  );
}
