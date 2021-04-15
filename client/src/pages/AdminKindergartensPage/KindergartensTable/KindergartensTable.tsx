import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';
import { KindergartensTableRow } from './KindergartensTableRow';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
    onEditClick: (value: Kindergarten) => void;
}

export const KindergartensTable = ({ kindergartens, onEditClick }: Props) => {
    const { t } = useTranslation();

    return (
        <TableContainer component={Box}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('test-results.kindergarten-number')}</TableCell>
                        <TableCell>{t('test-results.kindergarten-name')}</TableCell>
                        <TableCell>{t('test-results.kindergarten-address')}</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {kindergartens.map((kindergarten) => (
                        <KindergartensTableRow
                            key={kindergarten._id}
                            kindergarten={kindergarten}
                            onEditClick={onEditClick}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
