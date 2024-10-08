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
    onChange: (type: string, value: string | string[]) => void;
    onSubmit: () => void;
}

export function AgreementsFilter({ agreementType, agreementStatus, agreementKindergarten, onChange, onSubmit }: Props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                    <AgreementTypeInput value={agreementType.id} onChange={onChange} />
                </Grid>
                <Grid item xs={6}>
                    <AgreementStatusInput value={agreementStatus.id} onChange={onChange} />
                </Grid>
            </Grid>
            <Grid container>
                <AgreementKindergartenInput values={agreementKindergarten} onChange={onChange} />
            </Grid>
            <Grid container justifyContent="flex-end">
                <ButtonSecondary variant="contained" className={classes.filterButton} onClick={onSubmit}>
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
