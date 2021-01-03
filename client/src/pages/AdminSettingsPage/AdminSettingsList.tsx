import React from 'react';
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AdminSettingsItem } from './AdminSettingsItem';
import { useParents } from '../../operations/queries/Users/getUsersByRole';

export const AdminSettingsList = () => {
    const classes = useStyles();
    const { parents } = useParents();
    const { t } = useTranslation();

    return (
        <TableContainer>
            <Typography className={classes.title} variant={'h4'}>
                {t('parent-settings.header')}
            </Typography>
            <TableHead>
                <TableRow className={classes.header}>
                    <TableCell>{t('parent-settings.header-title-1')}</TableCell>
                    <TableCell>{t('parent-settings.header-title-2')}</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {parents.map((parent) => {
                    return <AdminSettingsItem values={parent} key={parent.mail} />;
                })}
            </TableBody>
        </TableContainer>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        fontSize: theme.typography.subtitle2.fontSize,
        color: theme.palette.text.primary,
    },
    title: {
        margin: theme.spacing(2.5, 0, 0, 2),
    },
}));
