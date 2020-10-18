import React from 'react';
import React, { useContext } from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { EditChildModal } from './EditChildModal';
import { UserContext } from '../../AppWrapper';
import { Theme } from '../../../theme';
import { KindergartenResponse, KINDERGARTENS } from '../../../graphql/kindergartensRepository';

export function ChildDetails() {
    return <div>child details</div>;
    const user = useContext(UserContext);
    const { data: kindergartenData } = useQuery<KindergartenResponse>(KINDERGARTENS);
    const classes = useStyles();
    const { t } = useTranslation();
    );
        </div>
            />
                kindergartens={kindergartenData.kindergartens}
                }}
                    });*/
                        },
                            child: newChild,
                        variables: {
                    /*UPDATE_CHILD({
                handleSubmit={_child => {
            <EditChildModal
            <Typography variant="h4">{t('child-profile.child-details.form')} </Typography>
        <div className={classes.mainContainer}>
    return (

    if (!user || !kindergartenData) return null;

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
