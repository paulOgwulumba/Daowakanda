import { Detail } from '@/features/governance/pages/detail';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Detail />
    </Suspense>
  );
}
