import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { AgreementTypeFilter } from '../../../models/AgreementTypeFilters';
import { AgreementStatusFilter } from '../../../models/AgreementStatusFilter';
import { AgreementKindergartenFilter } from '../../../models/AgreementKindergartenFilters';
import { ButtonSecondary } from '../../../components/Button';
import { AgreementTypeInput } from './AgreementTypeInput';
import { AgreementStatusInput } from './AgreementStatusInput';
import { AgreementKindergartenInput } from './AgreementKindergartenInput';

interface Props {
    agreementType: AgreementTypeFilter;
    agreementStatus: AgreementStatusFilter;
    agreementKindergarten: AgreementKindergartenFilter[];
}

export function AgreementsFilter({ agreementType, agreementStatus, agreementKindergarten }: Props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                    <AgreementTypeInput value={agreementType.id} />
                </Grid>
                <Grid item xs={6}>
                    <AgreementStatusInput value={agreementStatus.id} />
                </Grid>
            </Grid>
            <Grid container>
                <AgreementKindergartenInput values={agreementKindergarten} />
            </Grid>
            <Grid container justify="flex-end">
                <ButtonSecondary variant="outlined">Wyczyść</ButtonSecondary>
                <ButtonSecondary variant="contained" className={classes.filterButton}>
                    <CheckCircleOutlineIcon />
                </ButtonSecondary>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            display: 'flex',
            marginBottom: theme.spacing(2),
            minWidth: 160,
            flex: 1,
        },
        filterButton: {
            marginLeft: theme.spacing(2),
        },
    }),
);
