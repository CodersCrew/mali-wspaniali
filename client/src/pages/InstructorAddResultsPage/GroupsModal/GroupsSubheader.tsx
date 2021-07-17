import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

// import { useIsDevice } from '../../queries/useBreakpoints';
import { Assessment } from '../../../graphql/types';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';

import { openGroupsModal } from './GroupsModal';

interface Props {
    selectedKindergarten: string;
    selectedAssessment: string;
    assessments: Assessment[];
}
export function GroupsSubheader(props: Props) {
    const { t } = useTranslation();
    // const classes = useStyles();

    // const device = useIsDevice();
    return (
        <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item>
                <Typography variant="subtitle1">{t('groupsModal.groups')}</Typography>
            </Grid>

            <Grid item>
                <ButtonSecondary
                    aria-label="groups"
                    variant="contained"
                    startIcon={<PermIdentityIcon />}
                    innerText={t('groupsModal.groups')}
                    onClick={() => openGroupsModal({ ...props })}
                />
            </Grid>
        </Grid>
    );
}

/* const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
    }) */
