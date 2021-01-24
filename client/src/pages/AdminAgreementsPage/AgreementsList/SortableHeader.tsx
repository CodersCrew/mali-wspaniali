import React from 'react';
import { TableCell, TableRow, Theme, makeStyles, createStyles, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { AgreementSortStatus } from '../../../models/AgreementSortStatus';

interface Props {
    activeSortType: string;
    onSortChange: (value: string) => void;
}

export function SortableHeader({ activeSortType, onSortChange }: Props) {
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell />
            <ArrowedCell
                isUpward={isUpwardSort(activeSortType, AgreementSortStatus.BY_NAME_RISING.id)}
                isActive={isActiveSort(activeSortType, [
                    AgreementSortStatus.BY_NAME_RISING.id,
                    AgreementSortStatus.BY_NAME_FALLING.id,
                ])}
                text="Nazwa przedszkola"
                onClick={() =>
                    onSortChange(
                        omitActiveStatus(
                            activeSortType,
                            AgreementSortStatus.BY_NAME_RISING.id,
                            AgreementSortStatus.BY_NAME_FALLING.id,
                        ),
                    )
                }
            />
            <ArrowedCell
                isUpward={isUpwardSort(activeSortType, AgreementSortStatus.BY_IMAGE_RISING.id)}
                isActive={isActiveSort(activeSortType, [
                    AgreementSortStatus.BY_IMAGE_RISING.id,
                    AgreementSortStatus.BY_IMAGE_FALLING.id,
                ])}
                text="Ilość zgód wizerunkowych"
                onClick={() =>
                    onSortChange(
                        omitActiveStatus(
                            activeSortType,
                            AgreementSortStatus.BY_IMAGE_RISING.id,
                            AgreementSortStatus.BY_IMAGE_FALLING.id,
                        ),
                    )
                }
            />
            <ArrowedCell
                isUpward={isUpwardSort(activeSortType, AgreementSortStatus.BY_MARKETING_RISING.id)}
                isActive={isActiveSort(activeSortType, [
                    AgreementSortStatus.BY_MARKETING_RISING.id,
                    AgreementSortStatus.BY_MARKETING_FALLING.id,
                ])}
                text="Ilość zgód margetingowych"
                onClick={() =>
                    onSortChange(
                        omitActiveStatus(
                            activeSortType,
                            AgreementSortStatus.BY_MARKETING_RISING.id,
                            AgreementSortStatus.BY_MARKETING_FALLING.id,
                        ),
                    )
                }
            />
            <TableCell component="th" scope="row">
                <span className={classes.cellContainer}>Statusy</span>
            </TableCell>
        </TableRow>
    );
}

interface ArrowedCellProps {
    text: string;
    isUpward: boolean;
    isActive: boolean;
    onClick: () => void;
}

function ArrowedCell({ text, isUpward, isActive, onClick }: ArrowedCellProps) {
    const classes = useStyles();

    return (
        <TableCell component="th" scope="row">
            <span className={classes.cellContainer} onClick={onClick}>
                <IconButton>
                    {isUpward ? (
                        <ArrowUpwardIcon
                            classes={{ root: clsx({ [classes.arrow]: true, [classes.isActive]: isActive }) }}
                        />
                    ) : (
                        <ArrowDownwardIcon
                            classes={{ root: clsx({ [classes.arrow]: true, [classes.isActive]: isActive }) }}
                        />
                    )}
                </IconButton>
                <span>{text}</span>
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

function isUpwardSort(activeSort: string, sortType: string) {
    return activeSort === sortType;
}

function isActiveSort(activeSort: string, sortTypes: string[]) {
    return sortTypes.includes(activeSort);
}

function omitActiveStatus(activeStatus: string, aStatus: string, bStatus: string) {
    if (activeStatus === aStatus) return bStatus;

    return aStatus;
}
