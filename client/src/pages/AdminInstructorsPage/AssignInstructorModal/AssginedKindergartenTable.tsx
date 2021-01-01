import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
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
}

export const AssginedKindergartenTable = ({ kindergartens }: Props) => {
    // const { t } = useTranslation();
    const classes = useStyles();
    const [field, meta, helpers] = useField('selectedKindergartens');

    console.log(meta);

    const handleRowClick = (value: string) => {
        if (field.value.includes(value)) {
            helpers.setValue(field.value.filter((id: string) => id !== value));
        } else {
            helpers.setValue([...field.value, value]);
        }
    };

    return (
        <TableContainer classes={{ root: classes.table }}>
            <Table aria-label="assigned kindergarten table">
                <TableBody>
                    {kindergartens.map((kindergarten) => (
                        <TableRow
                            key={kindergarten._id}
                            hover
                            role="row"
                            onClick={() => handleRowClick(kindergarten._id)}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    {...field}
                                    value={kindergarten._id}
                                    checked={field.value.includes(kindergarten._id)}
                                    color="default"
                                />
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
