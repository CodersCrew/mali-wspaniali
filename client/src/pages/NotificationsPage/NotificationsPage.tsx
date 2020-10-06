import React, { useEffect } from 'react';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { NotificationPageList } from './NotificationPageList';
import { Pagination } from '../ArticleListPage/Pagination';
import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';

export const NotificationsPage = () => {
    const user = useMe();
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.notifications', 'parent-menu.notifications']);
    }, []);

    if (!user) return null;

    return (
        <Container classes={{ root: classes.container }}>
            <NotificationPageList notifications={user.notifications} />
            <Pagination disabledPrevious={true} disabledNext={true} handleChange={() => true}></Pagination>
        </Container>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
    }),
);
