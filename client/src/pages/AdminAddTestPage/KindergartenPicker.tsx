import React, { useState } from 'react';
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
    Theme,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { LabeledContainer } from '../../components/LabeledContainer';
import { Kindergarten } from '../../graphql/types';

interface Props {
    isDisabled: boolean;
    kindergartens: { selected: boolean; kindergarten: Kindergarten }[];
    onSelect: (id: string[], options?: { selectedAll?: boolean }) => void;
}

export function KindergartenPicker({ isDisabled, kindergartens, onSelect }: Props) {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = useState('');
    const [selectedAll, setSelectedAll] = useState(false);

    const classes = useStyles();

    return (
        <LabeledContainer title={t('add-test-view.kindergartens.title')}>
            <>
                <Typography variant="subtitle1">{t('add-test-view.kindergartens.description')}</Typography>
                <div className={classes.searchFieldContainer}>
                    <TextField
                        label={t('add-test-view.kindergartens.find-kindergarten')}
                        type="search"
                        variant="outlined"
                        fullWidth
                        data-testid="search-field"
                        value={searchPhrase}
                        onChange={({ target: { value } }) => setSearchPhrase(value)}
                        size="small"
                    />
                </div>
                <TableContainer classes={{ root: classes.table }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        disabled={isDisabled}
                                        checked={selectedAll}
                                        onClick={() => {
                                            if (isDisabled) return;

                                            if (selectedAll) {
                                                onSelect([], { selectedAll: true });
                                            } else {
                                                onSelect(
                                                    kindergartens.map((kindergarten) => kindergarten.kindergarten._id),
                                                    { selectedAll: true },
                                                );
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
                                    if (searchPhrase.length <= 3) return true;

                                    return kindergarten.kindergarten.name.includes(searchPhrase);
                                })
                                .map((kindergarten) => (
                                    <TableRow
                                        key={kindergarten.kindergarten._id}
                                        hover
                                        role="row"
                                        onClick={() => {
                                            if (isDisabled) return;

                                            onSelect([kindergarten.kindergarten._id]);
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                disabled={isDisabled}
                                                checked={kindergarten.selected}
                                                color="default"
                                            />
                                        </TableCell>
                                        <TableCell classes={{ root: classes.kindergartenItem }}>
                                            {kindergarten.kindergarten.number}/{kindergarten.kindergarten.name}
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
