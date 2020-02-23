import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableHead, TableRow, TableCell, IconButton } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/firebase';

interface Results {
  title: string;
  description: string;
  date: Date;
  points: number;
}

interface Agreements {
  agreementId: string;
  isAgreed: boolean;
}

interface Child {
  firstName: string;
  lastName: string;
  userid: string;
  birthYear: number;
  birthQuarter: number;
  city: string;
  kindergartenNo: string;
  groupNo: string;
  results: Results;
  agreements: Agreements;
}

export const AdminResultsPage = () => {
  const [data, setData] = useState<firebase.firestore.DocumentData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const firstQuery = firebase.db
      .collection("children")
      .orderBy("lastName")
      .limit(rowsPerPage);

    firstQuery.onSnapshot((snapshots) => {
      if (!snapshots.empty) {
        const documents: firebase.firestore.DocumentData[] = snapshots.docs.map((doc) => doc.data());
        setData(documents);
        setLastVisible(snapshots.docs[snapshots.docs.length - 1])
      } else {
        setData([]);
      }
    });
  }, []);

  const getData = (query: firebase.firestore.Query<firebase.firestore.DocumentData>) => {
    query.onSnapshot((snapshots) => {
        if (!snapshots.empty) {
          const documents: firebase.firestore.DocumentData[] = snapshots.docs.map((doc) => doc.data());
          setData(documents);
          setLastVisible(snapshots.docs[snapshots.docs.length - 1])
        } else {
          setData([]);
        }
      });
  }

  const nextPageChangeHandler = () => {
    const query = firebase.db
      .collection("children")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .startAfter(lastVisible)
    getData(query);
    setPage(page + 1)
  }

  const previousPageChangeHandler = () => {
    const query = firebase.db
      .collection("children")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .endBefore(lastVisible);
    getData(query);
    setPage(page - 1)
  }

  if (data.length !== 0) {
    return (
      <Container >
        <Typography variant="h2" align="center" gutterBottom >
          {t('searchResult')}
      </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Child Name</TableCell>
              {data[0].results.map((result: Results) => {
                return (
                  <TableCell>{result.title} score</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((child: firebase.firestore.DocumentData) => {
              return (
                <TableRow>
                  <TableCell>{`${child.firstName} ${child.lastName}`}</TableCell>
                  {child.results.map((result: Results) => {
                    return (
                      <TableCell>{result.points}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div>
          <IconButton disabled={page === 0 ? true : false} onClick={previousPageChangeHandler}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={nextPageChangeHandler}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </Container>
    )
  } else {
    return (
      <Typography variant="h3" align="center" gutterBottom>
        {t('noResults')}
      </Typography>
    )
  }
}
