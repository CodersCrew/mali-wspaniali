import React, { useState } from 'react';
import {
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { LabeledContainer } from '../../components/LabeledContainer';
import { Kindergarten } from '../../graphql/types';

interface Props {
    kindergartens: { selected: boolean; kindergarten: Kindergarten }[];
}

export function KindergartenList({ kindergartens }: Props) {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = useState('');

    const classes = useStyles();

    return (
        <LabeledContainer title={t('add-test-view.kindergartens.title')}>
            <>
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
                <TableContainer classes={{ root: classes.table }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('add-test-view.kindergartens.kindergarten-name')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kindergartens
                                .filter((kindergarten) => kindergarten.selected)
                                .map((kindergarten) => (
                                    <TableRow key={kindergarten.kindergarten._id} hover role="row">
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

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            height: 295,
        },
        kindergartenItem: {
            cursor: 'default',
        },
    }),
);
