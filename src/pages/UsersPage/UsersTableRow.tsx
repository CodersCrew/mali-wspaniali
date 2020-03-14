import React from 'react';
import { TableRow, TableCell } from '@material-ui/core/';
import { Document, Agreement } from '../../firebase/types';
import { useTranslation } from 'react-i18next';

export const UsersTableRow = ({ user }: { user: Document }) => {
  const { t } = useTranslation();

  const userAgreements = () => {
    if (user.agreements) {
      user.agreements.map((aggr: Agreement) => (
        <TableCell key={`${user.userId}-${aggr.agreementId}`}>
          {aggr.agreementId}
          {aggr.isAgreed}
        </TableCell>
      ));
    } else {
      return <TableCell>{t("no-results")}</TableCell>;
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
