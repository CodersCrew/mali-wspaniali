import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '../../../theme';
import { UserContext } from '../../AppWrapper';
import { KindergartenResponse, KINDERGARTENS } from '../../../graphql/kindergartensRepository';
import { EditChildModal } from './EditChildModal';

export function ChildDetails() {
    const user = useContext(UserContext);
    const { data: kindergartenData } = useQuery<KindergartenResponse>(KINDERGARTENS);
    const classes = useStyles();

    if (!user || !kindergartenData) return null;

    return (
        <div className={classes.mainContainer}>
            <Typography variant="h4"> Edit your child's details if necessary</Typography>
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
            height: theme.spacing(72),
        },
    }),
);
