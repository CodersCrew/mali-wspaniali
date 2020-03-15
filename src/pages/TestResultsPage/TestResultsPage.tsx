import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getChildrenData } from '../../queries/childQueries';
import { Child } from '../../firebase/types';
import { Container, Typography, Table, TableBody } from '@material-ui/core/';
import { TestResultsTableRow } from './TestResultsTableRow';
import { NoResults } from './NoResults';
import { Pagination, PaginationDirections } from './Pagination';

export const TestResultsPage = () => {
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();
  const [isLoading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [listeners, setListeners] = useState<(() => void)[]>([]);

  const detachListeners = () => {
    listeners.forEach(listener => () => listener());
  };
  const waitForData = async () => {
    const {
      documents,
      unsubscribe,
      newLastVisible,
      newFirstVisible,
    } = await getChildrenData(rowsPerPage, null, null);
    if (unsubscribe) {
      setLastVisible(newLastVisible);
      setFirstVisible(newFirstVisible);
      setChildrenList(documents);
      setLoading(false);
      setListeners([...listeners, unsubscribe]);
    }
  }

  useEffect(() => {
    waitForData();
    return () => detachListeners();
  }, []);

  const pageChangeHandler = async (direction: string) => {
    setLoading(true);
    const { documents, unsubscribe, newLastVisible, newFirstVisible } =
      direction === PaginationDirections.next
        ? await getChildrenData(rowsPerPage, lastVisible, null)
        : await getChildrenData(rowsPerPage, null, firstVisible);
    if (unsubscribe) {
      setLastVisible(newLastVisible);
      setFirstVisible(newFirstVisible);
      setChildrenList(documents);
      setListeners([...listeners, unsubscribe]);
      setLoading(false);
      direction === PaginationDirections.next ? setPage(page + 1) : setPage(page - 1);
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
          {childrenList.map((child: Child) => (
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
