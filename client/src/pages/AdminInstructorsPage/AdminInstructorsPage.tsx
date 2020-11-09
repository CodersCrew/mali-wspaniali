import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { InstructorsTable } from './InstructorsTable/InstructorsTable';
import { InstructorsTableToolbar } from './InstructorsTable/InstructorsTableToolbar';
import { activePage } from '../../apollo_client';
import { useUsersByRole } from '../../operations/queries/Users/getUsersByRole';

export function AdminInstructorsPage() {
    const classes = useStyles();
    const { usersList } = useUsersByRole('instructor');

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    return (
        <div className={classes.container}>
            <InstructorsTableToolbar />
            <InstructorsTable instructors={usersList} />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
    }),
);
