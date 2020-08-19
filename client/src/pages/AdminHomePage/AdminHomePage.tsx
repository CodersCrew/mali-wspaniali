import React from 'react';
import { activePage } from '../../apollo_client';

export function AdminHomePage() {
    activePage(['menu.home']);

    return <div>Admin Home Page</div>;
}
