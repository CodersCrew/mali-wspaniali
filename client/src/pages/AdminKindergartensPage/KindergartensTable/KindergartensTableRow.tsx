import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergarten: Kindergarten;
    onEditClick: (value: Kindergarten) => void;
}

export const KindergartensTableRow = ({ kindergarten, onEditClick }: Props) => {
    const { t } = useTranslation();

    const { number, name, address, city } = kindergarten;

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {`${t('test-results.kindergarten-prefix')} ${number}`}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{`${address}, ${city}`}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="edit kindergarten" size="small" onClick={() => onEditClick(kindergarten)}>
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
};
