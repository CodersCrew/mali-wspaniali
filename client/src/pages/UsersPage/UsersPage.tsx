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
import { getUsersData } from '../../queries/userQueries';
import { Document } from '../../firebase/types';
import { UsersTableRow } from './UsersTableRow';
import { UserPagePagination, PaginationDirections } from './UserPagePagination';
import { NoResults } from './NoResults';
import { getAllUsers } from '../../graphql/userRepository';
import { User } from '../../graphql/types';

export const UsersPage = () => {
    const [usersList, setUsersList] = useState<Document[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);
    const [lastVisible, setLastVisible] = useState<Document | null>(null);
    const [firstVisible, setFirstVisible] = useState<Document | null>(null);
    const [listeners, setListeners] = useState<(() => void)[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getAllUsers().then(({ data: { users } }) => setUsers(users));
    }, []);

    const pageChangeHandler = async (direction: string) => {
        const { users, unsubscribe, newLastVisible, newFirstVisible } =
            direction === PaginationDirections.next
                ? await getUsersData(rowsPerPage, lastVisible, null)
                : await getUsersData(rowsPerPage, null, firstVisible);
        if (unsubscribe) {
            const newPageNumber = direction === PaginationDirections.next ? page + 1 : page - 1;

            setLastVisible(newLastVisible);
            setFirstVisible(newFirstVisible);
            setUsersList(users);
            setListeners([...listeners, unsubscribe]);
            setPage(newPageNumber);
        }
    };

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
                        {users.map(user => (
                            <UsersTableRow key={user._id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserPagePagination
                page={page}
                pageChangeHandler={pageChangeHandler}
                documentsCount={usersList.length}
                rowsPerPage={rowsPerPage}
            />
        </Container>
    );
};
