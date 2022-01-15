import React from 'react';
import { useParams } from 'react-router-dom';

import { activePage } from '../../apollo_client';
import { CustomContainer } from '../../components/CustomContainer';
import { PageContainer } from '../../components/PageContainer';
import { ResultPreview } from '../../components/ResultPreview/ResultPreview';

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
