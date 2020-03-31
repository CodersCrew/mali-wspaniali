import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { getCurrentUser } from '../../queries/userQueries';
import { getChildrenByUserId } from '../../queries/childQueries';
import { Child } from './types';

export const ChildrenListPage = () => {
    const { t } = useTranslation();
    const [children, setChildren] = useState([] as Child[]);

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (currentUser) {
            const unsubscribe = getChildrenByUserId(currentUser.uid, onSettingParentChildren);
            return () => unsubscribe();
        }

        return undefined;
    }, []);

    const onSettingParentChildren = (childArray: Child[]) => {
        setChildren(childArray);
    };

    return (
        <>
            <Link to="/">
                <Button variant="contained" color="primary">
                {t('go-to-home-page')}
                </Button>
            </Link>
            <Container maxWidth="sm">
                <Typography variant="h4" gutterBottom>
                    {t('parent-children-page.children')}
                </Typography>
                {children.length ? (
                    <List component="nav" aria-label={t('parent-children-page.children')}>
                        {children.map(child => 
                            <ListItem key={child.userId} button>
                                <ListItemText primary={`${child.firstName} ${child.lastName}`}/>
                            </ListItem>
                        )}
                    </List>
                ) : (
                    <Typography variant="body1" paragraph={true}>
                        {t('parent-children-page.no-children-has-been-found')}
                    </Typography>
                )}
            </Container>
        </>
    );
};