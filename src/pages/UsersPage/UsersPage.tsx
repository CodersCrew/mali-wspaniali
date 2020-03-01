import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsers, getUsersPaginated } from '../../queries/userQueries';
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
import { Pagination } from './Pagination';

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

  const addNewListener = (listener: () => void) => {
    let newListeners: (() => void)[] = listeners;
    newListeners.push(listener);
    setListeners(newListeners);
  };

  const detachListeners = () => {
    listeners.forEach(listener => () => listener());
  };

  useEffect(() => {
    async function waitForUsers() {
      const { documents, unsubscribe, loading, lastVisible } = await getUsers(
        rowsPerPage,
      );
      if (loading === false) {
        setLastVisible(lastVisible);
        setLoading(loading);
        setUsersList(documents);
        addNewListener(unsubscribe);
      }
    }
    waitForUsers();
    return () => detachListeners();
  }, []);

  const pageChangeHandler = async (direction: string) => {
    const { documents, unsubscribe, loading, newLastVisible, newFirstVisible } =
      direction === 'next'
        ? await getUsersPaginated(rowsPerPage, lastVisible, null)
        : await getUsersPaginated(rowsPerPage, null, firstVisible);
    if (loading === false) {
      setLastVisible(newLastVisible);
      setFirstVisible(newFirstVisible);
      setUsersList(documents);
      addNewListener(unsubscribe);
      setLoading(loading);
      direction === 'next' ? setPage(page + 1) : setPage(page - 1);
    }
  };

  if (isLoading) return <h2>Loading</h2>;

  return (
    <>
      <Link to="/">{t('homePage')}</Link>
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom className={classes.h4}>
          {t('users')}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('email')}</TableCell>
                <TableCell align="right">{t('firstName')}</TableCell>
                <TableCell align="right">{t('lastName')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map(user => (
                <UsersTableRow user={user} key={user.userId} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
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
