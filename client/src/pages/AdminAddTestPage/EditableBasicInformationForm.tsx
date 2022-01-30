import { useTranslation } from 'react-i18next';
import { Grid, TextField, createStyles, makeStyles, Theme, MenuItem, Typography } from '@material-ui/core';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';

import { LabeledContainer } from '../../components/LabeledContainer';
import { AssessmentManagerState } from './useAssessmentManager';
import { SelectList } from '../../components/SelectList';
import { OutlinedDateField } from '../../components/OutlinedDateField';
import { MeasurementStage } from '@app/graphql/types';

dayjs.extend(utc);

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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    {t('add-test-view.basic-information-form.first-measurement')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <OutlinedDateField
                                    disabled={isDisabled}
                                    label={t('add-test-view.basic-information-form.start-date')}
                                    value={parseDate(assessment.firstMeasurementStartDate)}
                                    onChange={(value) => onChange({ ...assessment, firstMeasurementStartDate: value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <OutlinedDateField
                                    disabled={isDisabled}
                                    label={t('add-test-view.basic-information-form.end-date')}
                                    value={parseDate(assessment.firstMeasurementEndDate)}
                                    onChange={(value) => onChange({ ...assessment, firstMeasurementEndDate: value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectList
                                    items={[
                                        <MenuItem key="not-planned" value="not-planned">
                                            {t('add-test-view.basic-information-form.not-planned')}
                                        </MenuItem>,
                                        <MenuItem key="done" value="planned">
                                            {t('add-test-view.basic-information-form.planned')}
                                        </MenuItem>,
                                        <MenuItem key="active" value="active">
                                            {t('add-test-view.basic-information-form.active')}
                                        </MenuItem>,
                                        <MenuItem key="done" value="done">
                                            {t('add-test-view.basic-information-form.done')}
                                        </MenuItem>,
                                    ]}
                                    disabled={isDisabled}
                                    label={t('add-test-view.basic-information-form.status')}
                                    value={assessment.firstMeasurementStatus}
                                    onSelect={(status) => {
                                        onChange({ ...assessment, firstMeasurementStatus: status as MeasurementStage });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    {t('add-test-view.basic-information-form.last-measurement')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <OutlinedDateField
                                    disabled={isDisabled}
                                    label={t('add-test-view.basic-information-form.start-date')}
                                    value={parseDate(assessment.lastMeasurementStartDate)}
                                    onChange={(value) => onChange({ ...assessment, lastMeasurementStartDate: value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <OutlinedDateField
                                    disabled={isDisabled}
                                    label={t('add-test-view.basic-information-form.end-date')}
                                    value={parseDate(assessment.lastMeasurementEndDate)}
                                    onChange={(value) => onChange({ ...assessment, lastMeasurementEndDate: value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectList
                                    items={[
                                        <MenuItem key="active" value="not-planned">
                                            {t('add-test-view.basic-information-form.not-planned')}
                                        </MenuItem>,
                                        <MenuItem key="done" value="planned">
                                            {t('add-test-view.basic-information-form.planned')}
                                        </MenuItem>,
                                        <MenuItem key="active" value="active">
                                            {t('add-test-view.basic-information-form.active')}
                                        </MenuItem>,
                                        <MenuItem key="done" value="done">
                                            {t('add-test-view.basic-information-form.done')}
                                        </MenuItem>,
                                    ]}
                                    disabled={isDisabled}
                                    label={t('add-test-view.basic-information-form.status')}
                                    value={assessment.lastMeasurementStatus}
                                    onSelect={(status) => {
                                        onChange({ ...assessment, lastMeasurementStatus: status as MeasurementStage });
                                    }}
                                />
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
        descriptionContainer: {
            marginBottom: theme.spacing(3),
        },
    }),
);

function parseDate(date: string): string {
    return dayjs.utc(date).format('YYYY-MM-DD');
}
