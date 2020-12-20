import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Card,
    createStyles,
    Theme,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
} from '@material-ui/core';
import { ButtonSecondary } from '../../components/Button';

import { lightTextColor, textColor } from '../../colors';
import { Agreement } from '../../graphql/types';

interface Props {
    agreements: Agreement[];
}
export const Agreements = ({ agreements }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    console.log(agreements)

    return (
        <Box className={classes.wrapper}>
            <Typography className={classes.heading}>{t('child-profile.agreements.heading')}</Typography>
            <Card className={classes.card}>
                <Typography className={classes.title}>
                    {t('child-profile.agreements.title')}
                </Typography>
                <Box className={classes.agreements}>
                    <ListItem
                        alignItems="flex-start"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <Checkbox
                                edge="start"
                                checked={true}
                                tabIndex={-1}
                                disabled={true}

                            />
                        </ListItemIcon>
                        <ListItemText
                            className={classes.listItemText}
                            primary={t(`child-profile.agreements.general-primary`)}
                            secondary={t(`child-profile.agreements.general-secondary`)}
                        />
                    </ListItem>
                    <List>
                        {agreements.map((agreement) => {
                            return (
                                <ListItem
                                    alignItems="flex-start"
                                    key={agreement._id}
                                >
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <Checkbox
                                            edge="start"
                                            checked={agreement.isSigned}
                                            tabIndex={-1}
                                            color="primary"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className={classes.listItemText}
                                        primary={t(`child-profile.agreements.${agreement.text}-primary`)}
                                        secondary={t(`child-profile.agreements.${agreement.text}-secondary`)}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                <ButtonSecondary variant="contained" className={classes.button}>
                    {t('child-profile.agreements.save')}
                </ButtonSecondary>
            </Card>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        agreements: {
            padding: '0 40px',

            [theme.breakpoints.down('md')]: {
                padding: 0,
            },
        },
        button: {
            marginTop: "16px",
            marginLeft: "40px",

            [theme.breakpoints.down('md')]: {
                marginLeft: 0,
            },
        },
        card: {
            padding: 16,
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        heading: {
            fontSize: theme.typography.h3.fontSize,
            lineHeight: theme.typography.h3.lineHeight,
            fontWeight: theme.typography.h3.fontWeight,
        },
        title: {
            fontSize: 21,
            fontWeight: 500,
            lineHeight: 1.4,
            color: textColor,
            marginBottom: '24px',
        },
        listItemIcon: {
            position: 'relative',
            top: -10,
            minWidth: 'unset',
            marginRight: 9,
        },
        listItemText: {
            '& .MuiListItemText-primary': {
                marginBottom: 16,
                fontSize: 16,
                lineHeight: '24px',
                color: textColor,
            },
            '& .MuiListItemText-secondary': {
                fontSize: 16,
                color: lightTextColor,
            },
        },
        wrapper: {
            padding: '24px',
        }
    })
);
