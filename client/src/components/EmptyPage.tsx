import { Skeleton } from '@material-ui/lab';

export const EmptyPage = () => {
    return (
        <>
            <Skeleton height={64} />
            <Skeleton height={64} />
            <Skeleton height={64} />
            <Skeleton height={64} />
        </>
    );
};
