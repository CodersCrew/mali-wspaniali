import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell } from '@material-ui/core/';
import { Results } from '../../pages/AdminResultsPage/types';

export const TestResultsTableRow = ({ child }: { child: firebase.firestore.DocumentData }) => {
  const { t } = useTranslation();

  const setTests = () => {
    if (child.results) {
      child.results.map((result: Results, index: number) => (
        <TableCell key={`${child.userId}-test${index}`}>{result.points}</TableCell>
      ))
    }
    else {
      return (<TableCell>{t("noResults")}</TableCell>)
    }
  }
  return (
    <TableRow>
      <TableCell>{`${child.firstName} ${child.lastName}`}</TableCell>
      {setTests()}
    </TableRow>
  )
}