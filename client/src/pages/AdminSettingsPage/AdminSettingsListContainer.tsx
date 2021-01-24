import React from 'react';
import { TableBody, TableCell, Table, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useParents } from '../../operations/queries/Users/getUsersByRole';
import { User } from '../../graphql/types';

import { AdminSettingsItem } from './AdminSettingsItem';

export const AdminSettingsListContainers = () => {
    const { parents } = useParents();
    const { t } = useTranslation();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>{t('parent-settings.header-title-1')}</TableCell>
                    <TableCell>{t('parent-settings.header-title-2')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {parents.map((parent: User) => {
                    return <AdminSettingsItem parent={parent} key={parent.mail} />;
                })}
            </TableBody>
        </Table>
    );
};
