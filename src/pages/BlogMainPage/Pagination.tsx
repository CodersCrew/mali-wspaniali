import React from 'react';
import { makeStyles, createStyles, Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { mainColor } from '../../colors';

type PaginationProps = {
    isFirst: boolean,
    isLast: boolean,
    handleChange: (paginationDirection: string) => void
}

export const Pagination = ({isFirst, isLast, handleChange}: PaginationProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const handleNextClick = () => {
        handleChange('next');
    };
    const handlePrevClick = () => {
        handleChange('prev');
    };

    return (
        <div className={classes.paginationContainer}>
            <Button variant="outlined" disabled={isFirst} onClick={handlePrevClick}>{t('blog-pagination.previous')}</Button>
            <Button variant="contained" disabled={isLast} className={classes.next} onClick={handleNextClick}>{t('blog-pagination.next')}</Button>
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        paginationContainer: {
            display: 'flex',
            justifyContent: 'center',
            padding: '5%'
        },
        next: {
            backgroundColor: mainColor,
            marginLeft: '2%'
        }
    }),
);