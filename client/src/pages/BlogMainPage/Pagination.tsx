import React from 'react';
import { makeStyles, createStyles, Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { mainColor, white } from '../../colors';

interface Props {
    isFirst: boolean;
    isLast: boolean;
    handleChange: (paginationDirection: string) => void;
}

export const Pagination = ({ isFirst, isLast, handleChange }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.paginationContainer}>
            <Button variant="outlined" disabled={isFirst} onClick={() => handleChange('prev')}>
                {t('blog-pagination.previous')}
            </Button>
            <Button variant="contained" disabled={isLast} className={classes.next} onClick={() => handleChange('next')}>
                {t('blog-pagination.next')}
            </Button>
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        paginationContainer: {
            display: 'flex',
            justifyContent: 'center',
            padding: '5%',
        },
        next: {
            backgroundColor: mainColor,
            marginLeft: '2%',
            color: white,
        },
        prev: {
            color: white,
        },
    }),
);
