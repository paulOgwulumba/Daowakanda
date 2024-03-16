import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface RedirectProps {
    to: string | '';
}

export function Redirect({ to }: RedirectProps) {
    const { push } = useRouter();

    useEffect(() => {
        push(to);
    });

    return <></>;
}
