import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, IconButton } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/Firebase';
import { TestResultsTableRow } from '../../components/TestResultsTableRow/TestResultsTableRow';

export const AdminResultsPage = () => {
  const [childrenList, setChildrenList] = useState<firebase.firestore.DocumentData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const { t } = useTranslation();
  const [listeners, setListeners] = useState<(()=>void)[]>([]);

  const addNewListener = (listener:(()=>void)) => {
    let newListeners: (()=>void)[] = listeners;
    newListeners.push(listener);
    setListeners(newListeners)
  }

  const detachListeners = () => {
    listeners.forEach((listener) => () => listener());
  }

  useEffect(() => {
    const { documents, unsubscribe, lastVisible } = firebase.child.getChildrenFirstPage(rowsPerPage);
    setLastVisible(lastVisible);
    setChildrenList(documents);
    addNewListener(unsubscribe);
    return () => detachListeners();
  }, []);

  const nextPageChangeHandler = () => {
    const { documents, unsubscribe, newLastVisible } = firebase.child.getChildrenNextPage(rowsPerPage, lastVisible[0]);
    setLastVisible(newLastVisible);
    setChildrenList(documents);
    addNewListener(unsubscribe);
    setPage(page + 1)
  }

  const previousPageChangeHandler = () => {
    const { documents, unsubscribe, newLastVisible } = firebase.child.getChildrenNextPage(rowsPerPage, lastVisible[0]);
    setLastVisible(newLastVisible);
    setChildrenList(documents);
    addNewListener(unsubscribe);
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
