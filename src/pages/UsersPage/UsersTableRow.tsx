import React from 'react';
import { TableRow, TableCell } from '@material-ui/core/';
import { Document } from '../../firebase/types';

export const UsersTableRow = ({ user }: { user: Document }) => {

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {user.email}
      </TableCell>
      <TableCell align="right">{user.firstname}</TableCell>
      <TableCell align="right">{user.lastname}</TableCell>
    </TableRow>
  );
};
