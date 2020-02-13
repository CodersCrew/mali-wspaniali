import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination } from '@material-ui/core/';
import i18next from "i18next"; // ADD LATER
import { firebase } from '../../firebase/Firebase';
import exampleData from './exampleData';

const AdminResultsPage = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState();
  const [itemsCount, setItemsCount] = useState();
  useEffect(() => {
    /*    const first = firebase.firestore.collection("children")
            .orderBy("lastName")
            .limit(rowsPerPage);
            first.get()
            .then((documentSnapshots) => {
              setData(first)
              setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length-1])
            })
            .catch(function (error) {
              console.error(error);
            })
            */
    const visibleData = exampleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setData(visibleData);
    setItemsCount(exampleData.length);
  }, []);

  const rowsPerPageChangeHandler = (event: any) => {
    setPage(0);
    const newRowsPerPage = parseInt(event.target.value, 10)
    const visibleData = exampleData.slice(0 * newRowsPerPage, 0 * newRowsPerPage + newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setData(visibleData);
  } 

  const pageChangeHandler = (event: any, newPage: number) => {
    const visibleData = exampleData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
    setPage(newPage);
    setData(visibleData);
  };
  if (data) {
    return (
      <Container >
        <Typography variant="h2" align="center" gutterBottom >
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
            <TableFooter>
              <TablePagination
                count={itemsCount}
                onChangePage={pageChangeHandler}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangeRowsPerPage={rowsPerPageChangeHandler}
              />
            </TableFooter>
          </Table>
        </Typography>
      </Container>
    )
  }
  else {
    return <h3>loading</h3>
  }
}

export default AdminResultsPage;
