import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsersData } from '../../queries/userQueries';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Document } from '../../firebase/types';
import { UsersTableRow } from './UsersTableRow';
import { UserPagePagination } from './UserPagePagination';
import { NoResults } from './NoResults';

export const UsersPage = () => {
  const [usersList, setUsersList] = useState<Document[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [listeners, setListeners] = useState<(() => void)[]>([]);
  const { t } = useTranslation();

  const detachListeners = () => {
    listeners.forEach(listener => () => listener());
  };

  const waitForUsers = async () => {
    const {
      documents,
      unsubscribe,
      newLastVisible,
      newFirstVisible,
    } = await getUsersData(rowsPerPage, null, null);
    if (unsubscribe) {
      setLastVisible(newLastVisible);
      setFirstVisible(newFirstVisible);
      setIsLoading(false);
      setUsersList(documents);
      setListeners([...listeners, unsubscribe]);
    }
  }

  useEffect(() => {
    waitForUsers();
    return () => detachListeners();
  }, []);

  const pageChangeHandler = async (direction: string) => {
    const NEXT = 'next';
    const { documents, unsubscribe, newLastVisible, newFirstVisible } =
      direction === NEXT
        ? await getUsersData(rowsPerPage, lastVisible, null)
        : await getUsersData(rowsPerPage, null, firstVisible);
    if (unsubscribe) {
      setLastVisible(newLastVisible);
      setFirstVisible(newFirstVisible);
      setUsersList(documents);
      setListeners([...listeners, unsubscribe]);
      setIsLoading(false);
      direction === NEXT ? setPage(page + 1) : setPage(page - 1);
    }
  };

  if (isLoading) return <h2>Loading</h2>;
  if (usersList.length === 0) return <NoResults />;

  return (
    <>
      <Link to="/">{t('go-to-home-page')}</Link>
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
              {usersList.map(user => (
                <UsersTableRow user={user} key={user.id} />
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
    </>
  );
};

export default UsersPage;
