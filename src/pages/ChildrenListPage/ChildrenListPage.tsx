import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Child } from './interface';
import { getParentChildren } from '../../queries/childQueries';

import { Button, Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';

interface ChildrenListProps {
    children: [Child]
};

const ChildrenListPage = (props: ChildrenListProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [children, setChildren] = useState<Array<Child>>([]);

    useEffect(() => {
        setLoading(true);
        const parentId = "1";
        getParentChildren(parentId)
        .then(response => {   
            setChildren(response);     
            setLoading(false); 
        }, err => {
            setError(err);
            setLoading(false);
        });
    }, []);

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
                                <ListItemText primary={child.firstName + " " + child.lastName}/>
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

export default ChildrenListPage;