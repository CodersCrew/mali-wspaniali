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
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import clsx from 'clsx';
import moment from 'moment';

import { ButtonDefault } from '../../../components/Button/ButtonDefault';
import { KeyCodeSeries } from '../../../graphql/types';
import { ArrowTooltip } from '../../../components/Tooltip/ArrowTooltip';

interface Props {
    keyCodeSeries: KeyCodeSeries[];
    onKeyCodeClick: (series: string) => void;
}

export function ActiveKeysList({ keyCodeSeries, onKeyCodeClick }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
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
                            {keyCodeSeries.map(({ series, count, target, date }) => {
                                const expirationDate = moment(date).add(7, 'days');

                                return (
                                    <TableRow key={series}>
                                        <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
                                            <ArrowTooltip
                                                title={t('admin-setting-page.keycode-generation.download') as string}
                                            >
                                                <span>
                                                    <ButtonDefault
                                                        icon={<SaveAltIcon className={classes.downloadIcon} />}
                                                        onClick={() => onKeyCodeClick(series)}
                                                        classes={{ root: classes.button }}
                                                    >
                                                        mw-keycodes-{series}.clsx
                                                    </ButtonDefault>
                                                </span>
                                            </ArrowTooltip>
                                        </TableCell>
                                        <TableCell classes={{ root: clsx(classes.targetCell, classes.cell) }}>
                                            {target}
                                        </TableCell>
                                        <TableCell classes={{ root: classes.cell }}>{count}</TableCell>
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
