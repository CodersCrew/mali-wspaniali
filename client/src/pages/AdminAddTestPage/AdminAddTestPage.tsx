import React, { useEffect } from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { activePage } from '../../apollo_client';
import { BasicInformationForm } from './BasicInformationForm';
import { KindergartenPicker } from './KindergartenPicker';
import { TestInformation } from './TestInformation';
import { useAddTest } from './useAddTest';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { ButtonSecondary } from '../../components/Button';
import { ArrowTooltip } from '../../components/Tooltip/ArrowTooltip';

export function AdminAddTestPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const {
        testInformation,
        setTestInformation,
        submit,
        kindergartens,
        selectKindergarten,
        reasonForBeingDisabled,
    } = useAddTest(result => {
        if ('errors' in result) {
            openSnackbar({ text: t(result.errors), severity: 'error' });
        } else {
            openSnackbar({ text: t('add-test-view.assessment-created') });
        }
    });

    function redirectIntoTestPage() {
        history.push('/admin/test-management');
    }

    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    return (
        <div className={classes.container}>
            <Grid container direction="column" alignItems="flex-end" spacing={6}>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item sm={12}>
                                    <BasicInformationForm value={testInformation} onChange={setTestInformation} />
                                </Grid>
                                <Grid item sm={12}>
                                    <TestInformation />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <KindergartenPicker
                                kindergartens={kindergartens}
                                onSelect={value => selectKindergarten(value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonSecondary variant="text" data-testid="create-button" onClick={redirectIntoTestPage}>
                                {t('add-test-view.cancel')}
                            </ButtonSecondary>
                        </Grid>
                        <Grid item>
                            <SubmitButton onClick={submit} reasonForBeingDisabled={reasonForBeingDisabled} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

interface SubmitButtonProps {
    onClick: () => void;
    reasonForBeingDisabled?: string;
}

function SubmitButton({ onClick, reasonForBeingDisabled }: SubmitButtonProps) {
    const { t } = useTranslation();

    const button = (
        <ButtonSecondary
            variant="contained"
            data-testid="create-button"
            onClick={onClick}
            disabled={!!reasonForBeingDisabled}
        >
            {t('add-test-view.create-test')}
        </ButtonSecondary>
    );

    if (reasonForBeingDisabled) {
        const translatedDisableReason = t(reasonForBeingDisabled);

        return (
            <ArrowTooltip title={translatedDisableReason}>
                <span>{button}</span>
            </ArrowTooltip>
        );
    }

    return button;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
    }),
);
