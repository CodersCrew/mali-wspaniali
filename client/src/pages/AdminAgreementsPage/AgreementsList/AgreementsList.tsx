import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableBody, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ChildrenFromKindergartenList } from './ChildrenFromKindergartenList';
import { Kindergarten } from '../../../graphql/types';
import { SortableHeader } from './SortableHeader';

interface Props {
    kindergartens: Kindergarten[];
    activeSortType: string;
    onSortChange: (value: string) => void;
}

export function AgreementsList({ kindergartens, activeSortType, onSortChange }: Props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <SortableHeader activeSortType={activeSortType} onSortChange={onSortChange} />
                </TableHead>
                <TableBody>
                    {kindergartens.map(kindergarten => (
                        <ChildrenFromKindergartenList
                            key={kindergarten._id}
                            kindergarten={kindergarten}
                            marketingAgreement={{ value: 35, total: 70 }}
                            viewAgreement={{ value: 45, total: 45 }}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
    }),
);
