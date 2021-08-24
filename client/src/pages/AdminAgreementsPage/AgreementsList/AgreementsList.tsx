import { TableContainer, Paper, Table, TableHead, TableBody, makeStyles, createStyles, Theme } from '@material-ui/core';

import { ChildrenFromKindergartenList } from './ChildrenFromKindergartenList';
import { ChildrenFromKindergartenListLoading } from './ChildrenFromKindergartenListLoading';
import { Child, KindergartenWithChildrens } from '../../../graphql/types';
import { SortableHeader } from './SortableHeader';

interface Props {
    kindergartens: KindergartenWithChildrens[];
    activeSortType: string;
    isLoading: boolean;
    onSortChange: (value: string) => void;
}

export function AgreementsList({ kindergartens, activeSortType, isLoading, onSortChange }: Props) {
    const classes = useStyles();

    if (isLoading)
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <SortableHeader activeSortType={activeSortType} onSortChange={onSortChange} />
                    </TableHead>
                    <TableBody>
                        <ChildrenFromKindergartenListLoading />
                        <ChildrenFromKindergartenListLoading />
                        <ChildrenFromKindergartenListLoading />
                        <ChildrenFromKindergartenListLoading />
                        <ChildrenFromKindergartenListLoading />
                        <ChildrenFromKindergartenListLoading />
                        <ChildrenFromKindergartenListLoading />
                    </TableBody>
                </Table>
            </TableContainer>
        );

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <SortableHeader activeSortType={activeSortType} onSortChange={onSortChange} />
                </TableHead>
                <TableBody>
                    {kindergartens.map((kindergarten) => (
                        <ChildrenFromKindergartenList
                            key={kindergarten._id}
                            kindergarten={kindergarten}
                            marketingAgreement={countAgreements(kindergarten, 'Marketing')}
                            viewAgreement={countAgreements(kindergarten, 'Image')}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Counting all agreements (per children, not per parent)
function countAgreements(kindergarten: KindergartenWithChildrens, name: string) {
    return kindergarten?.children.reduce(
        (acc: { value: number, total: number}, children: Child) => {
            if(!children.parent) {
                return {
                    value: acc.value,
                    total: acc.total
                };
            }

            return {
                value: acc.value + children?.parent.agreements.filter((agr: any) => agr.text === name && agr.isSigned).length,
                total: acc.total + children?.parent.agreements.filter((agr: any) => agr.text === name).length,
            };
        },
        { value: 0, total: 0 },
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
    }),
);
