import { Detail } from '@/features/governance/pages/detail';
import { Head } from 'next/document';
import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();

    const { title } = router.query;
    const urlTitle = title || ' '?.split(' ').join('-');

    return (
            <Detail title={title}/>
    );
}
