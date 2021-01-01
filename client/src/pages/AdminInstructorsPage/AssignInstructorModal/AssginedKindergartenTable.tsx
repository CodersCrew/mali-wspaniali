import React from 'react';
// import { useTranslation } from 'react-i18next';
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    Checkbox,
    TableBody,
    makeStyles,
    createStyles,
} from '@material-ui/core';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
    onSelect: (id: string) => void;
    selected: string[];
}

export const AssginedKindergartenTable = ({ kindergartens, onSelect, selected }: Props) => {
    // const { t } = useTranslation();
    const classes = useStyles();

    return (
        <TableContainer classes={{ root: classes.table }}>
            <Table aria-label="assigned kindergarten table">
                <TableBody>
                    {kindergartens.map((kindergarten) => (
                        <TableRow key={kindergarten._id} hover role="row" onClick={() => onSelect(kindergarten._id)}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={selected.includes(kindergarten._id)} color="default" />
                            </TableCell>
                            <TableCell classes={{ root: classes.kindergartenItem }}>
                                {kindergarten.number}/{kindergarten.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            maxHeight: 295,
        },
        kindergartenItem: {
            cursor: 'pointer',
        },
    }),
);
