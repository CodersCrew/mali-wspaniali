import React, { useContext } from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { EditChildModal } from './EditChildModal';
import { UserContext } from '../../AppWrapper';
import { Theme } from '../../../theme';
import { useKindergartens } from '../../../operations/queries/Kindergartens/getKindergartens';
import { Loader } from '../../../components/Loader';

export function ChildDetails() {
    const user = useContext(UserContext);
    const { kindergartenList, isKindergartenListLoading } = useKindergartens();
    const classes = useStyles();
    const { t } = useTranslation();
    if (!user || !kindergartenList) return null;
    if (isKindergartenListLoading) return <Loader />;

    return (
        <div className={classes.mainContainer}>
            <Typography variant="h4">{t('child-profile.child-details.form')} </Typography>
            <EditChildModal
                handleSubmit={_child => {
                    /* UPDATE_CHILD({
                        variables: {
                            child: newChild,
                        },
                    }); */
                }}
                kindergartens={kindergartenList}
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
