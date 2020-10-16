import React, { useEffect } from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { activePage } from '../../apollo_client';
import { BasicInformationForm } from './BasicInformationForm';
import { KindergartenPicker } from './KindergartenPicker';
import { TestInformation } from './TestInformation';
import { useAddTest } from './useAddTest';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';

export function AdminAddTestPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { testInformation, setTestInformation, submit, kindergartens, selectKindergarten } = useAddTest(result => {
        if ('errors' in result) {
            openSnackbar({ text: t(result.errors), severity: 'error' });
        } else {
            openSnackbar({ text: t('add-test-view.assessment-created') });
        }
    });
    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    return (
        <Grid container className={classes.container} spacing={2}>
            <Grid item sm={7}>
                <Grid container direction="column" spacing={2}>
                    <Grid item sm={12}>
                        <BasicInformationForm value={testInformation} onChange={setTestInformation} />
                    </Grid>
                    <Grid item sm={12}>
                        <TestInformation />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={5}>
                <KindergartenPicker kindergartens={kindergartens} onSelect={value => selectKindergarten(value)} />
            </Grid>
            <button data-testid="create-button" onClick={() => submit()}>
                Create a new test
            </button>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
    }),
);
