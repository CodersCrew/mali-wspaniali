import React from 'react';
import {
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Status } from '../../../components/Icons/Status';

interface Parent {
    email: string;
    children: string[];
    viewAgreement: boolean;
    marketingAgreement: boolean;
}

interface Props {
    parents: Parent[];
}

export function KindergartenAgreementsList({ parents }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h4">Osoby, które oddały zgodę wizerunkową</Typography>
            <Table size="small" aria-label="purchases" classes={{ root: classes.container }}>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('agreements.email')}</TableCell>
                        <TableCell>{t('agreements.children')}</TableCell>
                        <TableCell align="center">{t('agreements.image')}</TableCell>
                        <TableCell align="center">{t('agreements.marketing')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parents.map(parent => (
                        <TableRow key={parent.email}>
                            <TableCell>{parent.email}</TableCell>
                            <TableCell>
                                {parent.children.map(child => (
                                    <div key={child}>{child}</div>
                                ))}
                            </TableCell>
                            <TableCell align="center">
                                <Status success={parent.viewAgreement} />
                            </TableCell>
                            <TableCell align="center">
                                <Status success={parent.marketingAgreement} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

const useStyles = makeStyles((ttheme: Theme) =>
    createStyles({
        container: {
            maxHeight: 419,
        },
    }),
);
