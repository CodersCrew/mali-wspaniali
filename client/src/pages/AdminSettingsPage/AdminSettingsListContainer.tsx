import React, { useState } from 'react';
import { TableBody, TableCell, Table, TableHead, TableRow, TablePagination } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useParents } from '../../operations/queries/Users/getUsersByRole';
import { AdminSettingsItem } from './AdminSettingsItem';
import { User } from '../../graphql/types';

export const AdminSettingsListContainers = () => {
    const { parents } = useParents();
    const { t } = useTranslation();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
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

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={parents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};
