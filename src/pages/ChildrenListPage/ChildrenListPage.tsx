import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { getCurrentUser } from '../../queries/userQueries';
import { getChildrenByUserId } from '../../queries/childQueries';
import { QuerySnapshot } from '../../firebase/firebase';
import { Child } from './types';

interface ChildrenListProps {
    children: [Child]
};

export const ChildrenListPage = (props: ChildrenListProps) => {
    const { t } = useTranslation();
    const [children, setChildren] = useState([] as Child[]);

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (currentUser != null) {
            const unsubscribe = getChildrenByUserId(currentUser.uid, onSettingParentChildren);
            return () => unsubscribe();
        }
    }, []);

    const onSettingParentChildren = (snapshot: QuerySnapshot) => {
        let childArray = [] as Child[];
        childArray = snapshot.docs.map(row => {
            const childData = row.data();
            return {
                firstName: childData.firstName, 
                lastName: childData.lastName, 
                userId: childData.userId
            };
        });
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
                        {children.map((child, index) => 
                            <ListItem key={index} button>
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
    )
}