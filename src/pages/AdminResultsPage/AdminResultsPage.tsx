import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination, IconButton } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import i18next from "i18next"; // ADD LATER
import { firebase } from '../../firebase/Firebase';
import exampleData from './exampleData';

const AdminResultsPage = () => {
  const [data, setData] = useState<Array<firebase.firestore.DocumentData>>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  useEffect(() => {
    const firstQuery = firebase.firestore.collection("children")
      .orderBy("lastName")
      .limit(rowsPerPage);

    firstQuery.get()
      .then((snapshots) => {
        console.log(snapshots);
        if (!snapshots.empty) {
          const documents: Array<firebase.firestore.DocumentData> = [];
          snapshots.docs.map((doc) => {
            const document = doc.data();
            documents.push(document);
          });
          setData(documents);
          console.log(documents);
          setLastVisible(snapshots.docs[snapshots.docs.length - 1])
        } else {
          setData([]);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    /*
    const visibleData = exampleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setData(visibleData);
    setItemsCount(exampleData.length);
    */
  }, []);

  /*const rowsPerPageChangeHandler = (event: any) => {
    setPage(0);
    const newRowsPerPage = parseInt(event.target.value, 10)
    const visibleData = exampleData.slice(0 * newRowsPerPage, 0 * newRowsPerPage + newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setData(visibleData);
  }
  */

  const getData = (query: firebase.firestore.Query<firebase.firestore.DocumentData>) => {
    query.get()
      .then((snapshots) => {
        console.log(snapshots);
        if (!snapshots.empty) {
          const documents: Array<firebase.firestore.DocumentData> = [];
          snapshots.docs.map((doc) => {
            const document = doc.data();
            documents.push(document);
          });
          setData(documents);
          console.log(documents);
          setLastVisible(snapshots.docs[snapshots.docs.length - 1])
        } else {
          setData([]);
        }
      })
  }

  const nextPageChangeHandler = () => {
    const query = firebase.firestore.collection("children")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .startAfter(lastVisible)
    getData(query);
    const newPage = page + 1;
    setPage(newPage)
  }

  const previousPageChangeHandler = () => {
    const query = firebase.firestore.collection("children")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .endBefore(lastVisible);
    getData(query);
    const newPage = page - 1;
    setPage(newPage)
  }

  /*  const pageChangeHandler = (event: any, newPage: number) => {
      const visibleData = exampleData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
      setPage(newPage);
      setData(visibleData);
    };
    */

  if (data.length !== 0) {
    return (
      <Container >
        <Typography variant="h2" align="center" gutterBottom >
          Results
      </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Child Name</TableCell>
              {data[0].results.map((elem: any) => {
                return (
                  <TableCell>{elem.title} score</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elem: any) => {
              return (
                <TableRow>
                  <TableCell>{`${elem.firstName} ${elem.lastName}`}</TableCell>
                  {elem.results.map((result: any) => {
                    return (
                      <TableCell>{result.points}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
          {/*          <TableFooter>
            <TableRow>
              <TablePagination
                count={-1}
                onChangePage={pageChangeHandler}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangeRowsPerPage={rowsPerPageChangeHandler}
              />
            </TableRow>
</TableFooter>*/}
        </Table>
        <div>
          <IconButton onClick={previousPageChangeHandler}><ArrowBackIosIcon /></IconButton>
          <IconButton onClick={nextPageChangeHandler}><ArrowForwardIosIcon /></IconButton>
        </div>
      </Container>
    )
  } else {
    return (<h3>No results</h3>)
  }
}

export default AdminResultsPage;
