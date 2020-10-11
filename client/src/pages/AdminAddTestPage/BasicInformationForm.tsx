import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, createStyles, makeStyles, Theme, MenuItem } from '@material-ui/core';

import { LabeledContainer } from '../../components/LabeledContainer';
import { AddTestState } from './useAddTest';

interface Props {
    onChange: (value: AddTestState['testInformation']) => void;
}

const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000;

export function BasicInformationForm({ onChange }: Props) {
    const { t } = useTranslation();
    const [testName, setTestName] = useState('');
    const classes = useStyles();

    useEffect(() => {
        onChange({ testName });
    }, [testName, onChange]);

    const dateDefaultNow = new Date();

    const dateDefaultFuture = new Date(dateDefaultNow.getTime() + TWO_MONTHS);

    return (
        <LabeledContainer title={t('add-test-view.basic-information-form.title')}>
            <div>
                <div className={classes.descriptionContainer}>
                    {t('add-test-view.basic-information-form.description')}
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField
                                    id="test-name"
                                    variant="outlined"
                                    fullWidth
                                    label={t('add-test-view.basic-information-form.test-name')}
                                    value={testName}
                                    onChange={({ target: { value } }) => setTestName(value)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    select
                                    label={t('add-test-view.basic-information-form.status')}
                                    variant="outlined"
                                    fullWidth
                                    value="active"
                                >
                                    <MenuItem value="active">
                                        {t('add-test-view.basic-information-form.active')}
                                    </MenuItem>{' '}
                                    <MenuItem value="done">{t('add-test-view.basic-information-form.done')}</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label={t('add-test-view.basic-information-form.first-assessment')}
                                        type="date"
                                        defaultValue={formatDate(dateDefaultNow)}
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            </Grid>
                            <Grid item>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label={t('add-test-view.basic-information-form.last-assessment')}
                                        type="date"
                                        defaultValue={formatDate(dateDefaultFuture)}
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </LabeledContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        descriptionContainer: {
            marginBottom: theme.spacing(3),
        },
    }),
);

function formatDate(date: Date) {
    return date
        .toLocaleDateString()
        .split('/')
        .reverse()
        .join('-');
}
