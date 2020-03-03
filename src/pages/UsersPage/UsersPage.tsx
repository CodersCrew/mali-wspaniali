import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsersData } from '../../queries/userQueries';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  TableBody,
  Container,
  makeStyles,
  Paper,
} from '@material-ui/core/';
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
  const [isLoading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [listeners, setListeners] = useState<(() => void)[]>([]);
  const classes = useStyles();

  const detachListeners = () => {
    listeners.forEach(listener => () => listener());
  };

  useEffect(() => {
    async function waitForUsers() {
      const {
        documents,
        unsubscribe,
        loading,
        newLastVisible,
        newFirstVisible,
      } = await getUsersData(rowsPerPage, null, null);
      if (loading === false) {
        setLastVisible(newLastVisible);
        setFirstVisible(newFirstVisible);
        setLoading(loading);
        setUsersList(documents);
        setListeners([...listeners, unsubscribe]);
      }
    }
    waitForUsers();
    return () => detachListeners();
  }, []);

  const pageChangeHandler = async (direction: string) => {
    const { documents, unsubscribe, loading, newLastVisible, newFirstVisible } =
      direction === 'next'
        ? await getUsersData(rowsPerPage, lastVisible, null)
        : await getUsersData(rowsPerPage, null, firstVisible);
    if (!loading) {
      setLastVisible(newLastVisible);
      setFirstVisible(newFirstVisible);
      setUsersList(documents);
      setListeners([...listeners, unsubscribe]);
      setLoading(loading);
      direction === 'next' ? setPage(page + 1) : setPage(page - 1);
    }
  };

  if (isLoading) return <h2>Loading</h2>;
  if (usersList.length === 0) return <NoResults />;


  return (
    <>
      <Link to="/">{t('go-to-home-page')}</Link>
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom className={classes.h4}>
          {t('users-page.users-list')}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
  },
  h4: {
    display: 'flex',
  },
  table: {
    minWidth: 650,
  },
});

export default UsersPage;
