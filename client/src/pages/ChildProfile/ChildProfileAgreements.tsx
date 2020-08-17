import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import { lightTextColor, textColor } from '../../colors';
import { Agreement } from '../../graphql/types';

interface Props {
    agreements: Agreement[];
}
export const ChildProfileAgreements = ({ agreements }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Card className={classes.card}>
            <div>
                <Typography className={classes.heading}>{t('child-profile.agreements-title')}</Typography>
                <List>
                    {agreements.map(agreement => {
                        return (
                            <ListItem alignItems="flex-start" key={agreement._id}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <Checkbox edge="start" checked={agreement.isSigned} tabIndex={-1} />
                                </ListItemIcon>
                                <ListItemText
                                    className={classes.listItemText}
                                    primary={'zgoda 1'}
                                    secondary={agreement.text}
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
        color: textColor,
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
            color: textColor,
        },
        '& .MuiListItemText-secondary': {
            fontSize: 12,
            color: lightTextColor,
        },
    },
    image: {
        width: 316,
        height: 200,
        marginLeft: 'auto',
        alignSelf: 'flex-end',
    },
});
