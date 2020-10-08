import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    TableRow,
    TableCell,
    Collapse,
    Box,
    Table,
    TableHead,
    TableBody,
    IconButton,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import InsertChartIcon from '@material-ui/icons/InsertChart';

interface Props {
    open: boolean;
}

export const KindergartenChildrenTable = ({ open }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableRow>
            <TableCell className={classes.collapseCell} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box className={classes.collapseContainer}>
                        <Table size="small" aria-label="children">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('test-results.parents-email')}</TableCell>
                                    <TableCell>{t('test-results.children')}</TableCell>
                                    <TableCell />
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        wojtek.kowalski@gmail.com
                                    </TableCell>
                                    <TableCell>Kasia Kowalska, Zbyszek Kowalski</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit child" size="small">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="view results" size="small">
                                            <InsertChartIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        aniapilarczyk20@gmail.com
                                    </TableCell>
                                    <TableCell>Małgorzata Pilarczyk</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit child" size="small">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="view results" size="small">
                                            <InsertChartIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        collapseCell: {
            padding: 0,
        },
        collapseContainer: {
            margin: theme.spacing(0, 11),
        },
    }),
);
