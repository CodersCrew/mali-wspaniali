import React, { useContext, useEffect } from 'react';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { NotificationPageList } from './NotificationPageList';
import { Pagination } from '../ArticleListPage/Pagination';
import { UserContext } from '../AppWrapper';
import { activePage } from '../../apollo_client';

export const NotificationsPage = () => {
    const user = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.notifications', 'parent-menu.notifications']);
    }, []);

    if (!user) return null;

    const { notifications } = user;

    return (
        <Container classes={{ root: classes.container }}>
            <NotificationPageList notifications={notifications} />
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
