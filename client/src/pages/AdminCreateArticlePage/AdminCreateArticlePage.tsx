import React from 'react';
import { useDebounce } from 'use-debounce';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { BasicInformationPanel } from './BasicInformationPanel/BasicInformationPanel';

export default function CreateArticlePage() {
    React.useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);

    const [updatedForm, setUpdatedForm] = React.useState<Record<string, string>>({});
    const [debouncedUpdatedForm] = useDebounce(updatedForm, 500);

    console.log(debouncedUpdatedForm);

    return (
        <PageContainer>
            <BasicInformationPanel
                onChange={(key, value) => {
                    setUpdatedForm((prev) => ({ ...prev, [key]: value }));
                }}
            />
        </PageContainer>
    );
}
