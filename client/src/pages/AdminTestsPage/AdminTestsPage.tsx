import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { activePage } from '../../apollo_client';
import { TestHistoryList } from './TestHistoryList/TestHistoryList';

export function TestManagementPage() {
    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    return (
        <Grid container>
            <Grid item>
                <TestHistoryList />
            </Grid>
        </Grid>
    );
}
