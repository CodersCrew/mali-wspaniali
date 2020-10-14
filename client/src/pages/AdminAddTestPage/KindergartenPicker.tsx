import React, { useEffect, useState } from 'react';
import {
    Checkbox,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { LabeledContainer } from '../../components/LabeledContainer';
import { Kindergarten } from '../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
    onSelect: (id: string[]) => void;
}

export function KindergartenPicker({ kindergartens, onSelect }: Props) {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [selectedAll, setSelectedAll] = useState(false);

    useEffect(() => {
        onSelect(selected);
    }, [onSelect, selected]);

    const classes = useStyles();

    return (
        <LabeledContainer title={t('add-test-view.kindergartens.title')}>
            <>
                <Typography variant="subtitle1">{t('add-test-view.kindergartens.description')}</Typography>
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    variant="outlined"
                    fullWidth
                    data-testid="search-field"
                    value={searchPhrase}
                    onChange={({ target: { value } }) => setSearchPhrase(value)}
                />
                <TableContainer classes={{ root: classes.table }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onClick={() => {
                                            if (selectedAll) {
                                                setSelected([]);
                                            } else {
                                                setSelected(kindergartens.map(kindergarten => kindergarten._id));
                                            }

                                            setSelectedAll(prev => !prev);
                                        }}
                                        name="checkedB"
                                        color="default"
                                    />
                                </TableCell>
                                <TableCell>{t('add-test-view.kindergartens.kindergarten-name')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kindergartens
                                .filter(kindergarten => {
                                    if (searchPhrase.length <= 3) return true;

                                    return kindergarten.name.includes(searchPhrase);
                                })
                                .map(kindergarten => (
                                    <TableRow
                                        key={kindergarten.name}
                                        hover
                                        role="row"
                                        onClick={() => {
                                            setSelected(prev => {
                                                if (prev.includes(kindergarten._id)) {
                                                    return prev.filter(selectedId => selectedId !== kindergarten._id);
                                                }

                                                return [...prev, kindergarten._id];
                                            });
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={selected.includes(kindergarten._id)} color="default" />
                                        </TableCell>
                                        <TableCell>
                                            {kindergarten.number}/{kindergarten.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </LabeledContainer>
    );
}

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            height: 350,
        },
    }),
);
