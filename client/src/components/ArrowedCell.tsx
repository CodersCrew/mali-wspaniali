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
    onClick: () => void;
}

function ArrowedCell({ text, selectedCellName, cellName, onClick, isActive = true }: ArrowedCellProps) {
    const classes = useStyles();
    const isSelected = () => selectedCellName === cellName;
    const Arrow = isSelected() ? ArrowUpwardIcon : ArrowDownwardIcon;

    return (
        <TableCell component="th" scope="row">
            <span className={classes.cellContainer} onClick={onClick}>
                <span>{text}</span>
                <IconButton>
                    <Arrow classes={{ root: clsx({ [classes.arrow]: true, [classes.isActive]: isActive }) }} />
                </IconButton>
            </span>
        </TableCell>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cellContainer: {
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
        },
        arrow: {
            color: theme.palette.text.hint,
            cursor: 'pointer',
        },
        isActive: {
            color: theme.palette.text.secondary,
        },
    }),
);

export default ArrowedCell;
