import React, { useState } from 'react';
import { TableBody, TableCell, Table, TableHead, TableRow, TablePagination } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useUsers } from '../../operations/queries/Users/getUsersByRole';
import { AdminSettingsItem } from './AdminSettingsItem';
import { User } from '../../graphql/types';

interface AdminSettingsListContainersProps {
    role: string;
}

export function AdminSettingsListContainers(props: AdminSettingsListContainersProps) {
    const { users } = useUsers(props.role);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const isParent = props.role === 'parent';
    const Header = isParent ? ParentHeader : InstructorHeader;

    return (
        <div>
            <Table>
                <Header />
                <TableBody>
                    {users.map((user: User) => {
                        return <AdminSettingsItem user={user} key={user.mail} />;
                    })}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
}

function ParentHeader() {
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow>
                <TableCell>{t('user-settings.header-title-parent')}</TableCell>
                <TableCell>{t('user-settings.header-title-children')}</TableCell>
            </TableRow>
        </TableHead>
    );
}
function InstructorHeader() {
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow>
                <TableCell>{t('user-settings.header-title-instructor')}</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
}
