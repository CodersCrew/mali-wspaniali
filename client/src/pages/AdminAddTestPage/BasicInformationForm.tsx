import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, createStyles, makeStyles, Theme, MenuItem } from '@material-ui/core';

import { LabeledContainer } from '../../components/LabeledContainer';
import { AddTestState } from './useAddTest';

interface Props {
    value: AddTestState['testInformation'];
    onChange: (value: AddTestState['testInformation']) => void;
}

export function BasicInformationForm({ value: formValue, onChange }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

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
                                    data-testid="test-name"
                                    variant="outlined"
                                    fullWidth
                                    label={t('add-test-view.basic-information-form.test-name')}
                                    value={formValue.testName}
                                    onChange={({ target: { value } }) => onChange({ ...formValue, testName: value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    select
                                    label={t('add-test-view.basic-information-form.status')}
                                    variant="outlined"
                                    fullWidth
                                    value="active"
                                    disabled
                                >
                                    <MenuItem value="active">
                                        {t('add-test-view.basic-information-form.active')}
                                    </MenuItem>
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
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formValue.startDate}
                                        onChange={({ target: { value } }) =>
                                            onChange({ ...formValue, startDate: value })
                                        }
                                    />
                                </form>
                            </Grid>
                            <Grid item>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label={t('add-test-view.basic-information-form.last-assessment')}
                                        type="date"
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formValue.endDate}
                                        onChange={({ target: { value } }) => onChange({ ...formValue, endDate: value })}
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
