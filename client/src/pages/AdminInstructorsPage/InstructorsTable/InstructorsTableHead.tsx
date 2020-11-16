import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableRow, TableCell, createStyles, makeStyles, Theme } from '@material-ui/core';

export const InstructorsTableHead = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>{t('admin-instructors-page.table-headers.firstName')}</TableCell>
                <TableCell>{t('admin-instructors-page.table-headers.lastName')}</TableCell>
                <TableCell>{t('admin-instructors-page.table-headers.email')}</TableCell>
                <TableCell align="right" className={classes.kindergartenCell}>
                    {t('admin-instructors-page.table-headers.kindergarten-count')}
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        kindergartenCell: {
            paddingRight: theme.spacing(10),
        },
    }),
);
