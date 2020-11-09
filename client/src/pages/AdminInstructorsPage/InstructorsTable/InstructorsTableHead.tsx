import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableRow, TableCell } from '@material-ui/core';

export const InstructorsTableHead = () => {
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>{t('admin-instructors-page.table-headers.firstName')}</TableCell>
                <TableCell>{t('admin-instructors-page.table-headers.lastName')}</TableCell>
                <TableCell>{t('admin-instructors-page.table-headers.email')}</TableCell>
                <TableCell>{t('admin-instructors-page.table-headers.kindergarten-count')}</TableCell>
                <TableCell>{t('admin-instructors-page.table-headers.children-count')}</TableCell>
            </TableRow>
        </TableHead>
    );
};
