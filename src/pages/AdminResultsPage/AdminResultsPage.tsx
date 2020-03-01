import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getChildrenFirstPage,
  getChildrenPaginated,
} from '../../queries/childQueries';
import { Document } from '../../firebase/types';
import { Container, Typography, Table, TableBody } from '@material-ui/core/';
import { TestResultsTableRow } from './TestResultsTableRow';
import { NoResults } from './NoResults';
import { Pagination } from './Pagination';

export const AdminResultsPage = () => {
  const [childrenList, setChildrenList] = useState<Document[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();
  const [isLoading, setLoading] = useState(true);
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
    async function waitForData() {
      const {
        documents,
        unsubscribe,
        loading,
        lastVisible,
      } = await getChildrenFirstPage(rowsPerPage);
      if (loading === false) {
        setLastVisible(lastVisible);
        setChildrenList(documents);
        setLoading(loading);
        addNewListener(unsubscribe);
      }
    }
    waitForData();
    return () => detachListeners();
  }, []);

  const pageChangeHandler = async (direction: string) => {
    const { documents, unsubscribe, loading, newLastVisible, newFirstVisible } =
      direction === 'next'
        ? await getChildrenPaginated(rowsPerPage, lastVisible, null)
        : await getChildrenPaginated(rowsPerPage, null, firstVisible);
        if(loading === false) {
          setLastVisible(newLastVisible);
          setFirstVisible(newFirstVisible);
          setChildrenList(documents);
          addNewListener(unsubscribe);
          setLoading(loading);
          direction === 'next' ? setPage(page + 1) : setPage(page - 1);
        }
  };


  if (isLoading) return (<h2>loading</h2>);
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
