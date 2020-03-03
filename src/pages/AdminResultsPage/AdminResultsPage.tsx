import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getChildrenData } from '../../queries/childQueries';
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
  const [isLoading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [listeners, setListeners] = useState<(() => void)[]>([]);

  const detachListeners = () => {
    listeners.forEach(listener => () => listener());
  };

  useEffect(() => {
    async function waitForData() {
      const {
        documents,
        unsubscribe,
        loading,
        newLastVisible,
      } = await getChildrenData(rowsPerPage, null, null);
      if (!loading) {
        setLastVisible(newLastVisible);
        setChildrenList(documents);
        setLoading(loading);
        setListeners([...listeners, unsubscribe]);
      }
    }
    waitForData();
    return () => detachListeners();
  }, []);

  const pageChangeHandler = async (direction: string) => {
    const NEXT = 'next';
    setLoading(true);
    const { documents, unsubscribe, loading, newLastVisible, newFirstVisible } =
      direction === NEXT
        ? await getChildrenData(rowsPerPage, lastVisible, null)
        : await getChildrenData(rowsPerPage, null, firstVisible);
    if (!loading) {
      setLastVisible(newLastVisible);
      setFirstVisible(newFirstVisible);
      setChildrenList(documents);
      setListeners([...listeners, unsubscribe]);
      setLoading(loading);
      direction === NEXT ? setPage(page + 1) : setPage(page - 1);
    }
  };

  if (isLoading) return <h2>loading</h2>;
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
