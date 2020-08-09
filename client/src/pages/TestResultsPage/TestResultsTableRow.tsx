import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell } from '@material-ui/core/';
import { Result, Child } from '../../firebase/types';

export const TestResultsTableRow = ({ child }: { child: Child }) => {
    const { t } = useTranslation();

    return (
        <TableRow>
            <TableCell>{`${child.firstName} ${child.lastName}`}</TableCell>
            {child.results ? (
                child.results.map((result, index) => (
                    <TableCell key={`${child._id}-test${index}`}>{countSumOfPoints(result.test)}</TableCell>
                ))
            ) : (
                <TableCell>{t('test-results.no-results')}</TableCell>
            )}
        </TableRow>
    );
};
