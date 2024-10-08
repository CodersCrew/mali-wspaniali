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

import { KEY_CODE_VALID_DAYS } from '@app/constants';
import { KeyCodeSeries } from '@app/graphql/types';
import dayjs from '@app/localizedMoment';
import { FilenameButton } from './FilenameButton';

interface Props {
    keyCodeSeries?: KeyCodeSeries[];
    onKeyCodeClick: (series: string) => void;
}

export function ActiveKeysList({ keyCodeSeries = [], onKeyCodeClick }: Props) {
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
                            {keyCodeSeries.map(({ series, count, target, createdAt }) => {
                                const expirationDate = dayjs(createdAt).add(KEY_CODE_VALID_DAYS, 'days');

                                return (
                                    <TableRow key={series} data-testid="keycode-item">
                                        <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
                                            <span>
                                                <FilenameButton
                                                    text={`mw-keycodes-${target}-${count}-${series}.xlsx`}
                                                    tooltip={t('admin-setting-page.keycode-generation.download')}
                                                    onClick={() => {
                                                        onKeyCodeClick(series);
                                                    }}
                                                />
                                            </span>
                                        </TableCell>

                                        <TableCell
                                            classes={{ root: clsx(classes.targetCell, classes.cell) }}
                                            data-testid="keycode-item-target"
                                        >
                                            {t(`admin-setting-page.keycode-generation.role-${target}`)}
                                        </TableCell>

                                        <TableCell classes={{ root: classes.cell }} data-testid="keycode-item-count">
                                            {count}
                                        </TableCell>

                                        <TableCell classes={{ root: classes.cell }}>
                                            {expirationDate.format('LL')}&nbsp;(
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
