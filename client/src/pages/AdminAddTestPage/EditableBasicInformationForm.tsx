import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, createStyles, makeStyles, Theme, MenuItem } from '@material-ui/core';

import { LabeledContainer } from '../../components/LabeledContainer';
import { AssessmentManagerState } from './useAssessmentManager';

interface Props {
    isDisabled: boolean;
    assessment: AssessmentManagerState;
    onChange: (value: AssessmentManagerState) => void;
}

export function EditableBasicInformationForm({ isDisabled, assessment, onChange }: Props) {
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
                                    disabled={isDisabled}
                                    data-testid="test-name"
                                    variant="outlined"
                                    fullWidth
                                    label={t('add-test-view.basic-information-form.test-name')}
                                    value={assessment.title}
                                    onChange={({ target: { value } }) => onChange({ ...assessment, title: value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    select
                                    disabled={isDisabled}
                                    label={t('add-test-view.basic-information-form.status')}
                                    variant="outlined"
                                    fullWidth
                                    value={assessment.isOutdated ? 'done' : 'active'}
                                    onChange={({ target: { value } }) => {
                                        onChange({ ...assessment, isOutdated: value === 'done' });
                                    }}
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
                                        disabled={isDisabled}
                                        label={t('add-test-view.basic-information-form.first-assessment')}
                                        type="date"
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={assessment.startDate}
                                        onChange={({ target: { value } }) =>
                                            onChange({ ...assessment, startDate: value })
                                        }
                                    />
                                </form>
                            </Grid>
                            <Grid item>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        disabled={isDisabled}
                                        label={t('add-test-view.basic-information-form.last-assessment')}
                                        type="date"
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={assessment.endDate}
                                        onChange={({ target: { value } }) =>
                                            onChange({ ...assessment, endDate: value })
                                        }
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
