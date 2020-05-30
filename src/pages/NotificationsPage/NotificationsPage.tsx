import React from 'react'
import { NotificationPageHeader } from './NotificationPageHeader'
import { NotificationPageList } from './NotificationPageList'
import { Notification } from '../../firebase/types';
import { User } from 'firebase';
import { Container } from '@material-ui/core'
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getUserNotifications } from '../../queries/notificationQueries'
import { useAuthorization } from '../../hooks/useAuthorization';
// import { useTranslation } from 'react-i18next';

export const NotificationsPage = () => {
    // const classes = useStyles();
    // const { t } = useTranslation();
    const currentUser = useAuthorization(true);
    const notifications = useSubscribed<Notification[], User | null>(
        (callback: OnSnapshotCallback<Notification[]>) => {
            if (currentUser) {
                getUserNotifications(currentUser.uid, callback);
            }
        },
        [],
        [currentUser],
    ) as Notification[];
    
    return (
        <Container maxWidth="xl">
            <NotificationPageHeader/>
            <NotificationPageList notifications={notifications}/>
        </Container>
    )
}

// const useStyles = makeStyles((theme: Theme) => 
//     createStyles({
//         heading: {
//             fontWeight: 'bold',
//             fontSize: '34px',
//             marginBottom: '4%',
//             marginLeft: '3%',
//             width: '60%',
//             zIndex: 1,
//             position: 'relative',
//             bottom: '20px',
//         }
//     }))