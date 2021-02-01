import React from 'react';
import {
    createStyles,
    Divider,
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { KeyCodeSeries } from '../../../graphql/types';
import { FilenameButton } from './FilenameButton';
import dayjs from '../../../localizedMoment';

interface Props {
    keyCodeSeries: KeyCodeSeries[];
    onKeyCodeClick: (series: string) => void;
}

export function ActiveKeysList({ keyCodeSeries, onKeyCodeClick }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item data-testid="total-keycodes">
                {t('admin-setting-page.keycode-generation.keycode-amount-total', {
                    total: countTotalKeys(keyCodeSeries),
                })}
            </Grid>
            <Grid item>
                <Divider variant="fullWidth" />
            </Grid>
            <Grid item>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell classes={{ root: classes.cell }}>
                                    {t('admin-setting-page.keycode-generation.filename')}
                                </TableCell>
                                <TableCell classes={{ root: classes.cell }}>
                                    {t('admin-setting-page.keycode-generation.target')}
                                </TableCell>
                                <TableCell classes={{ root: classes.cell }}>
                                    {t('admin-setting-page.keycode-generation.keycode-amount')}
                                </TableCell>
                                <TableCell classes={{ root: classes.cell }}>
                                    {t('admin-setting-page.keycode-generation.expires-at')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...keyCodeSeries]
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map(({ series, count, target, date }) => {
                                    const expirationDate = dayjs(date).add(7, 'days');

                                    return (
                                        <TableRow key={series} data-testid="keycode-item">
                                            <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
                                                <span>
                                                    <FilenameButton
                                                        text={`mw-keycodes-${series}.clsx`}
                                                        tooltip={t('admin-setting-page.keycode-generation.download')}
                                                        onClick={() => onKeyCodeClick(series)}
                                                    />
                                                </span>
                                            </TableCell>
                                            <TableCell
                                                classes={{ root: clsx(classes.targetCell, classes.cell) }}
                                                data-testid="keycode-item-target"
                                            >
                                                {target}
                                            </TableCell>
                                            <TableCell
                                                classes={{ root: classes.cell }}
                                                data-testid="keycode-item-count"
                                            >
                                                {count}
                                            </TableCell>
                                            <TableCell classes={{ root: classes.cell }}>
                                                {expirationDate.toDate().toLocaleDateString()}&nbsp;(
                                                {expirationDate.fromNow()})
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

function countTotalKeys(keyCodeSeries: KeyCodeSeries[]) {
    return keyCodeSeries.reduce((acc, keyCode) => {
        return acc + keyCode.count;
    }, 0);
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        downloadIcon: {
            color: theme.palette.success.main,
        },
        targetCell: {
            textTransform: 'uppercase',
        },
        cell: {
            borderBottom: 'none',
        },
        button: {
            textTransform: 'none',
        },
    }),
);
