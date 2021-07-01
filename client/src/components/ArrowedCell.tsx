import { TableCell, IconButton, makeStyles, createStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import clsx from 'clsx';
import { Theme } from '../theme';

interface ArrowedCellProps {
    text: string;
    selectedCellName?: string;
    cellName: string;
    isActive?: boolean;
    arrowSize?: string;
    onClick: () => void;
}

function ArrowedCell({
    text,
    selectedCellName,
    cellName,
    onClick,
    arrowSize = '1em',
    isActive = true,
}: ArrowedCellProps) {
    const classes = useStyles({ arrowSize });
    const isSelected = () => selectedCellName === cellName;
    const Arrow = isSelected() ? ArrowUpwardIcon : ArrowDownwardIcon;

    return (
        <TableCell component="th" scope="row" padding="none">
            <span className={classes.cellContainer} onClick={onClick}>
                <span>{text}</span>
                <IconButton className={classes.arrowIcon}>
                    <Arrow classes={{ root: clsx({ [classes.arrow]: true, [classes.isActive]: isActive }) }} />
                </IconButton>
            </span>
        </TableCell>
    );
}

type propStyle = {
    arrowSize: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cellContainer: {
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            margin: '0px 4px',
        },
        arrowIcon: {
            padding: theme.spacing(1, 1),
        },
        arrow: {
            color: theme.palette.text.hint,
            cursor: 'pointer',
            width: ({ arrowSize }: propStyle) => arrowSize,
            height: ({ arrowSize }: propStyle) => arrowSize,
        },
        isActive: {
            color: theme.palette.text.secondary,
        },
    }),
);

export default ArrowedCell;
