import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { useSubscribed } from '../../hooks/useSubscribed';
import { Agreement, UserAgreement } from '../../firebase/types';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getAgreements } from '../../queries/agreementQueries';
import { getUserAgreements, toggleUserAgreement } from '../../queries/userQueries';
import { useAuthorization } from '../../hooks/useAuthorization';
import { User } from '../../firebase/firebase';

export const ChildProfileAgreements = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const currentUser = useAuthorization(true);

    const agreements = useSubscribed<Agreement[] | null, string>(
        (callback: OnSnapshotCallback<Agreement[]>) => getAgreements(callback),
        [],
    ) as Agreement[];

    const userAgreements = useSubscribed<UserAgreement[], User | null>(
        (callback: OnSnapshotCallback<UserAgreement[]>) => {
            if (currentUser) {
                getUserAgreements(currentUser.uid, callback);
            }
        },
        [],
        [currentUser],
    ) as UserAgreement[];

    const handleChange: CheckboxProps['onChange'] = ({ target: { checked, name } }) => {
        if (currentUser) {
            toggleUserAgreement(currentUser.uid, name, checked);
        }
    };

    return (
        <Card className={classes.card}>
            <div>
                <Typography className={classes.heading}>{t('child-profile.agreements-title')}</Typography>
                <List>
                    {agreements.map(item => {
                        const userAgreement = userAgreements.find(agreement => agreement.agreementId === item.id);
                        const isDisabled = item.required && userAgreement && userAgreement.checked;

                        return (
                            <ListItem alignItems="flex-start" key={item.id}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <Checkbox
                                        edge="start"
                                        checked={Boolean(userAgreement && userAgreement.checked)}
                                        onChange={(event, checked) => {
                                            if (!isDisabled) {
                                                handleChange(event, checked);
                                            }
                                        }}
                                        name={userAgreement && userAgreement.id}
                                        disableRipple={isDisabled}
                                        tabIndex={-1}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    className={classes.listItemText}
                                    primary={item.title}
                                    secondary={item.content}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
            <img className={classes.image} src="https://via.placeholder.com/316x200" alt="placeholder" />
        </Card>
    );
};

const useStyles = makeStyles({
    card: {
        padding: 40,
        display: 'flex',
    },
    heading: {
        fontSize: 21,
        fontWeight: 500,
        lineHeight: 1.4,
        color: '#1d1d1b',
    },
    listItemIcon: {
        position: 'relative',
        top: -10,
        minWidth: 'unset',
        marginRight: 9,
    },
    listItemText: {
        '& .MuiListItemText-primary': {
            marginBottom: 10,
            fontSize: 15,
            lineHeight: '24px',
            color: '#1d1d1b',
        },
        '& .MuiListItemText-secondary': {
            fontSize: 12,
            color: '#505050',
        },
    },
    image: {
        width: 316,
        height: 200,
        marginLeft: 'auto',
        alignSelf: 'flex-end',
    },
});
