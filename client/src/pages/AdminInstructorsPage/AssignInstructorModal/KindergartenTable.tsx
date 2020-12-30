import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
    onSelect: (id: string[]) => void;
}

export const KindergartenTable = ({ kindergartens, onSelect }: Props) => {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [selectedAll, setSelectedAll] = useState(false);

    useEffect(() => {
        onSelect(selected);
    }, [onSelect, selected]);

    const classes = useStyles();

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
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    onClick={() => {
                                        if (selectedAll) {
                                            setSelected([]);
                                        } else {
                                            setSelected(kindergartens.map((kindergarten) => kindergarten._id));
                                        }

                                        setSelectedAll((prev) => !prev);
                                    }}
                                    data-testid="select-all"
                                    color="default"
                                />
                            </TableCell>
                            <TableCell>{t('add-test-view.kindergartens.kindergarten-name')}</TableCell>
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
                                    onClick={() => {
                                        setSelected((prev) => {
                                            if (prev.includes(kindergarten._id)) {
                                                return prev.filter((selectedId) => selectedId !== kindergarten._id);
                                            }

                                            return [...prev, kindergarten._id];
                                        });
                                    }}
                                >
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
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            height: 295,
        },
        searchFieldContainer: {
            margin: theme.spacing(3, 0, 2),
        },
        kindergartenItem: {
            cursor: 'pointer',
        },
    }),
);
