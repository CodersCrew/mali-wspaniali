import React from 'react';
import { activePage } from '../../apollo_client';

export default function CreateArticlePage() {
    React.useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);

    return <div>Create article page</div>;
}
