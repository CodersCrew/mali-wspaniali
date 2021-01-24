import React from 'react';

import { activePage } from '../../apollo_client';

export default function CreateArticlePage() {
    React.useEffect(() => {
        activePage(['admin-menu.create-blog-article']);
    }, []);

    return <div>Create article page</div>;
}
