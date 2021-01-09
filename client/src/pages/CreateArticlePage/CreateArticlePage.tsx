import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export default function CreateArticlePage() {
    useEffect(() => {
        activePage(['admin-menu.create-blog-article']);
    }, []);

    return <div>Create article page</div>;
}
