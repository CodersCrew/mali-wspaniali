import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../AppWrapper/AppWrapper';
import { Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';

export const ChildrenListPage = () => {
    const { t } = useTranslation();
    const user = useContext(UserContext);

    if (!user) return null;

    const { children } = user;

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                {t('parent-children.children')}
            </Typography>
            {children ? (
                <List component="nav" aria-label={t('parent-children.children')}>
                    {children.map(child => (
                        <ListItem key={child._id} button>
                            <ListItemText primary={`${child.firstname} ${child.lastname}`} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1" paragraph={true}>
                    {t('parent-children.no-children-has-been-found')}
                </Typography>
            )}
        </Container>
    );
};
