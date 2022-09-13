import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { activePage } from '@app/apollo_client';
import { CustomContainer } from '@app/components/CustomContainer';
import { PageContainer } from '@app/components/PageContainer';
import { ResultPreview } from '@app/components/ResultPreview/ResultPreview';

export default function InstructorResultPage() {
    const params = useParams<{ resultId: string }>();

    useEffect(() => {
        activePage(['instructor-menu.child.results']);
    }, [params.resultId]);

    return (
        <PageContainer>
            <CustomContainer container={<ResultPreview resultId={params.resultId} />} />
        </PageContainer>
    );
}
