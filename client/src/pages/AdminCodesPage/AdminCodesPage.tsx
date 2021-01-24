import React, { useEffect } from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';

import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';

import { KeyCodes } from './KeyCodes/KeyCodes';

export default function AdminCodesPage() {
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.keycodes']);
    }, []);

    return (
        <PageContainer>
            <Paper classes={{ root: classes.innerContainer }}>
                <KeyCodes />
            </Paper>
        </PageContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        innerContainer: {
            padding: theme.spacing(2),
        },
    }),
);
