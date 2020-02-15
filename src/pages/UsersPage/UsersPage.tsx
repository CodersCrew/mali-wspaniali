import React from 'react';
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
import i18next from 'i18next';

export const UsersPage = () => {
  const classes = useStyles();

  function createData(email: string, firstname: string, lastname: string) {
    return { email, firstname, lastname };
  }

  /**
   * @TODO Remove dummy data and replace with real data from Firebase
   */
  const rows = [
    createData('john@doe.com', 'John', 'Doe'),
    createData('katie@doe.pl', 'Katie', 'Doe'),
    createData('alex@doe.pl', 'Alex', 'Doe'),
  ];

  return (
    <>
      <Link to="/">{i18next.t('homePage')}</Link>
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom className={classes.h4}>
          {i18next.t('users')}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{i18next.t('email')}</TableCell>
                <TableCell align="right">{i18next.t('firstName')}</TableCell>
                <TableCell align="right">{i18next.t('lastName')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.email}>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell align="right">{row.firstname}</TableCell>
                  <TableCell align="right">{row.lastname}</TableCell>
                </TableRow>
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
