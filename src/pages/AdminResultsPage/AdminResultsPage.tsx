import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, IconButton } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { TestResultsTableHead } from '../../components/TestResultsTableHead/TestResultsTableHead';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/firebase';
import { TestResultsTableRow } from '../../components/TestResultsTableRow/TestResultsTableRow';

export const AdminResultsPage = () => {
  const [childrenList, setChildrenList] = useState<firebase.firestore.DocumentData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const { t } = useTranslation();

  const getData = (query: firebase.firestore.Query<firebase.firestore.DocumentData>) => {
    query.onSnapshot((snapshots) => {
      if (!snapshots.empty) {
        const documents: firebase.firestore.DocumentData[] = snapshots.docs.map((doc) => doc.data());
        setChildrenList(documents);
        setLastVisible(snapshots.docs[snapshots.docs.length - 1])
      } else {
        setChildrenList([]);
      }
    });
  }

  useEffect(() => {
    const firstQuery = firebase.db
      .collection("child")
      .orderBy("lastName")
      .limit(rowsPerPage);
      getData(firstQuery);
  }, []);

  const nextPageChangeHandler = () => {
    const query = firebase.db
      .collection("child")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .startAfter(lastVisible)
    getData(query);
    setPage(page + 1)
  }

  const previousPageChangeHandler = () => {
    const query = firebase.db
      .collection("child")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .endBefore(lastVisible);
    getData(query);
    setPage(page - 1)
  }

  const renderEmpty = () => {
    return (
      <Typography variant="h3" align="center" gutterBottom>
        {t('noResults')}
      </Typography>
    )
  }

  if (childrenList.length === 0) return renderEmpty();

  return (
    <Container >
      <Typography variant="h2" align="center" gutterBottom >
        {t('searchResult')}
      </Typography>
      <Table>
        <TestResultsTableHead childrenList={childrenList} />
        <TableBody>
          {childrenList.map((child: firebase.firestore.DocumentData) => <TestResultsTableRow key={child.userId} child={child} />)}
        </TableBody>
      </Table>
      <div>
        <IconButton disabled={page === 0} onClick={previousPageChangeHandler}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton disabled={childrenList.length < rowsPerPage} onClick={nextPageChangeHandler}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </Container>
  )
}
