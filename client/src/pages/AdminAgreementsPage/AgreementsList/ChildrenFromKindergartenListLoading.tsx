import { TableRow, TableCell, IconButton, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export function ChildrenFromKindergartenListLoading() {
    const classes = useStyles();

    return (
        <TableRow classes={{ root: classes.rowContainer }}>
            <TableCell size="small">
                {
                    <IconButton aria-label="expand row" size="small">
                        <KeyboardArrowDownIcon />
                    </IconButton>
                }
            </TableCell>
            <TableCell classes={{ root: classes.root }} size="small">
                <Skeleton />
            </TableCell>
            <TableCell classes={{ root: classes.root }} size="small">
                <Skeleton />
            </TableCell>
            <TableCell classes={{ root: classes.root }} size="small">
                <Skeleton />
            </TableCell>
            <TableCell classes={{ root: classes.statusCellRoot }} size="small">
                <Skeleton classes={{ root: classes.skeletonCircle }} variant="circle" width={16} height={16} />
                <Skeleton width={70} />
            </TableCell>
        </TableRow>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(8),
        },
        statusCellRoot: {
            paddingLeft: theme.spacing(2),
            display: 'flex',
        },
        skeletonCircle: {
            marginRight: theme.spacing(1),
        },
        rowContainer: {
            height: 43,
        },
    }),
);
