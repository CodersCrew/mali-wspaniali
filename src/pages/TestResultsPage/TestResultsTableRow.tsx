import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell } from '@material-ui/core/';
import { Result, Child } from '../../firebase/types';
//import { Child } from '../../firebase/childRepository';

export const TestResultsTableRow = ({ child }: { child: Child }) => {
    const { t } = useTranslation();

    const getTests = () => {
        if (child.results) {
            child.results.map((result: Result, index: number) => (
                <TableCell key={`${child.userId}-test${index}`}>{result.points}</TableCell>
            ));
        } else {
            return <TableCell>{t('test-results.no-results')}</TableCell>;
        }
    };
    return (
        <TableRow>
            <TableCell>{`${child.firstName} ${child.lastName}`}</TableCell>
            {getTests()}
        </TableRow>
    );
};
