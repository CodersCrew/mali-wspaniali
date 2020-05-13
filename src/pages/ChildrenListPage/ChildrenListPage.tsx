import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSubscribed } from '../../hooks/useSubscribed';
import { useAuthorization } from '../../hooks/useAuthorization';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getCurrentUser } from '../../queries/userQueries';
import { getChildrenByUserId } from '../../queries/childQueries';
import { Child } from '../../firebase/types';

export const ChildrenListPage = () => {
    useAuthorization(true);
    const { t } = useTranslation();
    const currentUser = getCurrentUser();
    const children = useSubscribed<Child[]>((callback: OnSnapshotCallback<Child[]>) => {
        if (currentUser) {
            getChildrenByUserId(currentUser.uid, callback);
        }
    }) as Child[];

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                {t('parent-children.children')}
            </Typography>
            {children ? (
                <List component="nav" aria-label={t('parent-children.children')}>
                    {children.map(child => (
                        <ListItem key={child.id} button>
                            <ListItemText primary={`${child.firstName} ${child.lastName}`} />
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
