import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsers } from '../../queries/userQueries';
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

export const UsersPage = () => {
  const [usersList, setUsersList] = useState<Document[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();
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
    const {
      documents,
      unsubscribe,
    } = getUsers(rowsPerPage);
    setLastVisible(documents[documents.length - 1]);
    setUsersList(documents);
    addNewListener(unsubscribe);
    return () => detachListeners();
  }, []);

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
                <UsersTableRow user={user} key={user.userId}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
