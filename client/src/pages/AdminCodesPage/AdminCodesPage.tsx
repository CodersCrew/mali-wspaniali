import React, { useEffect } from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';

import { activePage } from '../../apollo_client';
import { KeyCodes } from './KeyCodes/KeyCodes';
import { PageContainer } from '../../components/PageContainer';

export default function AdminCodesPage() {
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.keycodes']);
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
