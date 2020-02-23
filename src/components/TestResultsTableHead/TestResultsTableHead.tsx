import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHead, TableRow, TableCell } from '@material-ui/core/';
import { Results } from '../../pages/AdminResultsPage/types';

interface Props {
  childrenList: firebase.firestore.DocumentData[]
}

export const TestResultsTableHead = (props: Props) => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell>{t("fullName")}</TableCell>
        {props.childrenList.map((child: any) => {
          if (child.results !== undefined) {
            return child.results.map((result: Results, index: number) => <TableCell key={`${child.userId}-${index}`}>{result.title}</TableCell>)
          } else {
            return <TableCell>{t('noTests')}</TableCell>
          }
        })}
      </TableRow>
    </TableHead>
  )
}