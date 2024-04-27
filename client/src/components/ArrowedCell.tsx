import { useState, useEffect } from 'react';
import { TableCell, IconButton, makeStyles, createStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import clsx from 'clsx';

import { Theme } from '@app/theme';

interface ArrowedCellProps {
    text: string;
    isSelected: boolean;
    isActive?: boolean;
    arrowSize?: string;
    onClick: () => void;
}

function ArrowedCell({ text, isSelected, onClick, arrowSize = '1em', isActive = true }: ArrowedCellProps) {
    const classes = useStyles({ arrowSize });
    const Arrow = isSelected ? ArrowUpwardIcon : ArrowDownwardIcon;

    return (
        <TableCell component="th" scope="row" padding="none">
            <span className={classes.cellContainer} onClick={() => isActive && onClick()}>
                <span>{text}</span>

                <IconButton className={classes.arrowIcon}>
                    <Arrow classes={{ root: clsx({ [classes.arrow]: true, [classes.isActive]: isActive }) }} />
                </IconButton>
            </span>
        </TableCell>
    );
}

type PropStyle = {
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
            width: ({ arrowSize }: PropStyle) => arrowSize,
            height: ({ arrowSize }: PropStyle) => arrowSize,
        },
        isActive: {
            color: theme.palette.text.secondary,
        },
    }),
);

export default ArrowedCell;

export const useArrowedCell = <T,>(rowElements: T[]) => {
    const [selectedSortableCell, setSelectedSortableCell] = useState<string | undefined>();
    const [elements, setElements] = useState([...rowElements]);

    useEffect(() => {
        setElements([...rowElements]);
        setSelectedSortableCell(undefined);
    }, [rowElements]);

    const cellParameters = (cellValueName: string, compareExpression: (b: T, c: T) => number) => ({
        name: cellValueName,
        changeActive: () => {
            setSelectedSortableCell((prev) => (prev !== cellValueName ? cellValueName : undefined));
            setElements(elements.sort(compareExpression));
        },
        setActive: () => {
            setSelectedSortableCell(cellValueName);
            setElements(elements.sort(compareExpression));
        },
    });

    return [elements, selectedSortableCell, cellParameters] as const;
};
