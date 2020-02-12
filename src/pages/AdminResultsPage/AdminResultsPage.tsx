import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core/';
import i18next from "i18next"; // ADD LATER
import { firebase } from '../../firebase/Firebase';
import exampleData from './exampleData';

const AdminResultsPage = () => {
  const [data, setData] = useState(exampleData);

  /*useEffect(() => {
    (function getData() {
      firebase.db
        .collection("children")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          console.log(data);
        })
    })();
  })
  */
  return (
    <Container >
      <Typography variant="h2" align="center" gutterBottom >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Child Name</TableCell>
              {data[0].results.map((elem) => {
                return (
                  <TableCell>{elem.title} score</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elem) => {
              return (
                <TableRow>
                  <TableCell>{`${elem.firstName} ${elem.lastName}`}</TableCell>
                  {elem.results.map((result) => {
                    return (
                      <TableCell>{result.points}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Typography>
    </Container>
  )
}

export default AdminResultsPage;
