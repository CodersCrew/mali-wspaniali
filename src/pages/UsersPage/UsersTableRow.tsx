import React from 'react';
import { TableRow, TableCell } from '@material-ui/core/';
import { Document, Agreement } from '../../firebase/types';

export const UsersTableRow = ({ user }: { user: Document }) => {
  const userAgreements = () => {
    if (user.agreements) {
      user.agreements.map((aggr: Agreement) => (
        <TableCell key={`${user.userId}-${aggr.agreementId}`}>
          {aggr.agreementId}
          {aggr.isAgreed}
        </TableCell>
      ));
    } else {
      return <TableCell>No Agreements</TableCell>;
    }
  };
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {user.email}
      </TableCell>
      {userAgreements()}
    </TableRow>
  );
};
