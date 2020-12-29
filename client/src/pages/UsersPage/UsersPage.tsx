import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Container,
    TableContainer,
    TableHead,
    Table,
    TableCell,
    Typography,
    TableRow,
    TableBody,
} from '@material-ui/core';
import { UsersTableRow } from './UsersTableRow';
import { UserPagePagination } from './UserPagePagination';
import { NoResults } from './NoResults';
import { getAllUsers } from '../../graphql/userRepository';
import { User } from '../../graphql/types';

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getAllUsers().then(({ data }) => setUsers(data!.users));
    }, []);

    if (users.length === 0) return <NoResults />;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {t('users-page.users-list')}
            </Typography>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('e-mail')}</TableCell>
                            <TableCell>{t('users-page.agreements')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <UsersTableRow key={user._id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserPagePagination
                page={0}
                pageChangeHandler={() => true}
                documentsCount={users.length}
                rowsPerPage={10}
            />
        </Container>
    );
};
