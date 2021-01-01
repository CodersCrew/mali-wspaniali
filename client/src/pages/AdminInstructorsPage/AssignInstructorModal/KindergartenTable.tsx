import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import {
    TextField,
    InputAdornment,
    Checkbox,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
}

export const KindergartenTable = ({ kindergartens }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [field, meta, helpers] = useField('selectedKindergartens');

    const [searchPhrase, setSearchPhrase] = useState('');

    console.log(meta);

    const handleRowClick = (value: string) => {
        if (field.value.includes(value)) {
            helpers.setValue(field.value.filter((id: string) => id !== value));
        } else {
            helpers.setValue([...field.value, value]);
        }
    };

    return (
        <>
            <TextField
                id="search"
                label="Szukaj"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={searchPhrase}
                onChange={({ target: { value } }) => setSearchPhrase(value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon color="disabled" />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer classes={{ root: classes.table }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell} padding="checkbox" />
                            <TableCell className={classes.tableHeadCell}>
                                {' '}
                                {t('add-test-view.kindergartens.kindergarten-name')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {kindergartens
                            .filter((kindergarten) => {
                                if (searchPhrase.length === 0) return true;

                                return kindergarten.name.toLowerCase().includes(searchPhrase);
                            })
                            .map((kindergarten) => (
                                <TableRow
                                    key={kindergarten._id}
                                    hover
                                    role="row"
                                    onClick={() => handleRowClick(kindergarten._id)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox {...field} value={kindergarten._id} color="default" />
                                    </TableCell>
                                    <TableCell classes={{ root: classes.kindergartenItem }}>
                                        {kindergarten.number}/{kindergarten.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            height: 295,
        },
        tableHeadCell: {
            paddingTop: 0,
        },
        searchFieldContainer: {
            margin: theme.spacing(3, 0, 2),
        },
        kindergartenItem: {
            cursor: 'pointer',
        },
    }),
);
