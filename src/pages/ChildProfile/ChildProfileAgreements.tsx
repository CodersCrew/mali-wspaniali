import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const DISABLED_FIELDS = ['participation'];

export const ChildProfileAgreements = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [agreements, setAgreements] = useState([
        {
            name: 'participation',
            checked: true,
            disabled: true,
            label: t('child-profile.participation-label'),
            description: t('child-profile.participation-description'),
        },
        {
            name: 'marketing',
            checked: false,
            disabled: false,
            label: t('child-profile.marketing-label'),
            description: t('child-profile.marketing-description'),
        },
        {
            name: 'image',
            checked: true,
            disabled: false,
            label: t('child-profile.image-label'),
            description: t('child-profile.image-description'),
        },
    ]);

    const handleChange: CheckboxProps['onChange'] = ({ target: { name, checked } }) => {
        const newAgreements = agreements.map(item =>
            item.name === name && !DISABLED_FIELDS.includes(name) ? { ...item, checked } : item,
        );
        setAgreements(newAgreements);
    };

    return (
        <Card className={classes.card}>
            <div>
                <Typography className={classes.heading}>
                    Poniżej możesz sprawdzić i edytować podpisane zgody.
                </Typography>
                <List>
                    {agreements.map(item => (
                        <ListItem alignItems="flex-start" key={item.name}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <Checkbox
                                    edge="start"
                                    checked={item.checked}
                                    onChange={handleChange}
                                    name={item.name}
                                    disableRipple={item.disabled}
                                    tabIndex={-1}
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={classes.listItemText}
                                primary={item.label}
                                secondary={item.description}
                            />
                        </ListItem>
                    ))}
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
