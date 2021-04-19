import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

interface Props {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }: Props) => {
    const classes = useStyles();

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    return (
        <div className={classes.content2}>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content2: {
            display: 'flex',
        },
    }),
);
