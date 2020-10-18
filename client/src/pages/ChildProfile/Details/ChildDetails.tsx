import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { EditChildModal } from './EditChildModal';
import { UserContext } from '../../AppWrapper';
import { Theme } from '../../../theme';
import { KindergartenResponse, KINDERGARTEN_WITH_USERS } from '../../../graphql/kindergartensRepository';

export function ChildDetails() {
    const user = useContext(UserContext);
    const { data: kindergartenData } = useQuery<KindergartenResponse>(KINDERGARTEN_WITH_USERS);
    const classes = useStyles();
    const { t } = useTranslation();
    if (!user || !kindergartenData) return null;
    return (
        <div className={classes.mainContainer}>
            <Typography variant="h4">{t('child-profile.child-details.form')} </Typography>
            <EditChildModal
                handleSubmit={_child => {
                    /*UPDATE_CHILD({
                        variables: {
                            child: newChild,
                        },
                    });*/
                }}
                kindergartens={kindergartenData.kindergartens}
            />
        </div>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            background: theme.palette.background.paper,
            margin: theme.spacing(3),
            padding: theme.spacing(2),
        },
    }),
);
