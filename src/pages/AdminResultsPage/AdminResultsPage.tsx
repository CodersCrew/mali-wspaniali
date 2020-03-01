import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/firebase';
import { Document } from '../../firebase/types';
import { Container, Typography, Table, TableBody } from '@material-ui/core/';
import { TestResultsTableRow } from './TestResultsTableRow';
import { NoResults } from './NoResults';
import { Pagination } from './Pagination';

export const AdminResultsPage = () => {
  const [childrenList, setChildrenList] = useState<Document[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(1);
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();
  const { t } = useTranslation();
  const [listeners, setListeners] = useState<(() => void)[]>([]);

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
      lastVisible,
    } = firebase.child.getChildrenFirstPage(rowsPerPage);
    setLastVisible(lastVisible);
    setChildrenList(documents);
    addNewListener(unsubscribe);
    return () => detachListeners();
  }, []);

  const pageChangeHandler = (direction: string) => {
    const { documents, unsubscribe, newLastVisible, newFirstVisible } =
      direction === 'next'
        ? firebase.child.getChildrenPaginated(rowsPerPage, lastVisible, null)
        : firebase.child.getChildrenPaginated(rowsPerPage, null, firstVisible);
    setLastVisible(newLastVisible);
    setFirstVisible(newFirstVisible);
    setChildrenList(documents);
    addNewListener(unsubscribe);
    direction === 'next' ? setPage(page + 1) : setPage(page - 1);
  };

  if (childrenList.length === 0) return <NoResults />;

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        {t('search-result')}
      </Typography>
      <Table>
        <TableBody>
          {childrenList.map((child: Document) => (
            <TestResultsTableRow key={child.userId} child={child} />
          ))}
        </TableBody>
      </Table>
      <Pagination
        page={page}
        pageChangeHandler={pageChangeHandler}
        documentsCount={childrenList.length}
        rowsPerPage={rowsPerPage}
      />
    </Container>
  );
};
