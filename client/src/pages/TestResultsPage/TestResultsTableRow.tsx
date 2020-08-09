import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell } from '@material-ui/core/';
import { Child } from '../../graphql/types';
import { countSumOfPoints } from '../../utils/countSumOfPoints';

interface Props {
    child: Child;
}

export const TestResultsTableRow = ({ child }: Props) => {
    const { t } = useTranslation();

    return (
        <TableRow>
            <TableCell>{`${child.firstname} ${child.lastname}`}</TableCell>
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
