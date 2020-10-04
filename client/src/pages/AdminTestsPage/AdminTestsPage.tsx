import React, { useEffect } from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { activePage } from '../../apollo_client';
import { TestHistoryList } from './TestHistoryList/TestHistoryList';
import { ButtonSecondary } from '../../components/Button';

export function TestManagementPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();

    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    return (
        <Grid container>
            <Grid item sm={12}>
                <div className={classes.container}>
                    <div className={classes.searchContainer}>
                        <ButtonSecondary variant="contained" onClick={() => history.push('/admin/test-management/add')}>
                            {t('manage-test-view.test-search.create-test')}
                        </ButtonSecondary>
                    </div>
                    <div className={classes.listContainer}>
                        <TestHistoryList />
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: `0 ${theme.spacing(3)}px`,
        },
        searchContainer: {
            marginTop: 44,
        },
        listContainer: {
            marginTop: 50,
        },
    }),
);
