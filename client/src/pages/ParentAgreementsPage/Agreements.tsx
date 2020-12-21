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

import { Agreement } from '../../graphql/types';

interface Props {
    agreements: Agreement[];
}
export const Agreements = ({ agreements }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Box className={classes.wrapper}>
            <Typography variant="h3">{t('child-profile.agreements.heading')}</Typography>
            <Card className={classes.card}>
                <Typography variant="h4" className={classes.title}>
                    {t('child-profile.agreements.title')}
                </Typography>
                <Box className={classes.agreements}>
                    <List>
                        <ListItem
                            alignItems="flex-start"
                        >
                            <ListItemIcon className={classes.listItemIcon}>
                                <Checkbox checked disabled />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: classes.primary, secondary: classes.secondary }}
                                primary={
                                    <span>
                                        <Typography variant="subtitle1">
                                            {t('child-profile.agreements.general-title')}
                                        </Typography>
                                    </span>
                                }
                                secondary={
                                    <span>
                                        <Typography variant="body1">
                                            {t('child-profile.agreements.general-description')}
                                        </Typography>
                                    </span>
                                }
                                
                            />
                        </ListItem>
                        {agreements.map((agreement) => {
                            return (
                                <ListItem
                                    alignItems="flex-start"
                                    key={agreement._id}
                                >
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <Checkbox
                                            checked={agreement.isSigned}
                                            color="primary"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ primary: classes.primary, secondary: classes.secondary }}
                                        primary={
                                            <span>
                                                <Typography variant="subtitle1">
                                                    {t(`child-profile.agreements.${agreement.text}-title`)}
                                                </Typography>
                                            </span>
                                        }
                                        secondary={
                                            <span>
                                                <Typography variant="body1">
                                                    {t(`child-profile.agreements.${agreement.text}-description`)}
                                                </Typography>
                                            </span>
                                        }
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
            marginTop: 16,
            marginLeft: 40,

            [theme.breakpoints.down('md')]: {
                marginLeft: 0,
            },
        },
        card: {
            padding: 16,
            marginTop: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        title: {
            marginBottom: 24,
        },
        listItemIcon: {
            position: 'relative',
            top: -10,
            minWidth: 'unset',
            marginRight: 9,
        },
        primary: {
            marginBottom: 16,
        },
        secondary: {
            color: theme.palette.text.secondary,
        },
        wrapper: {
            padding: 24,
        }
    })
);
