import { TableContainer, Paper, Table, TableHead, TableBody, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ChildrenFromKindergartenList } from './ChildrenFromKindergartenList';
import { KindergartenWithUsers } from '../../../graphql/types';
import { SortableHeader } from './SortableHeader';
import { ChildrenFromKindergartenListLoading } from './ChildrenFromKindergartenListLoading';

interface Props {
    kindergartens: KindergartenWithUsers[];
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

function countAgreements(kindergarten: KindergartenWithUsers, name: string) {
    return kindergarten.users.reduce(
        (acc, user) => {
            return {
                value: acc.value + user.agreements.filter((a) => a.text === name && a.isSigned).length,
                total: acc.total + user.agreements.filter((a) => a.text === name).length,
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
