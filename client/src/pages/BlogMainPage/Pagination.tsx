import React from 'react';
import { makeStyles, createStyles, Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { mainColor, white } from '../../colors';

interface Props {
    disabledPrevious: boolean;
    disabledNext: boolean;
    handleChange: (paginationDirection: string) => void;
}

export const Pagination = ({ disabledPrevious, disabledNext, handleChange }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.paginationContainer}>
            <Button variant="outlined" disabled={disabledPrevious} onClick={() => handleChange('prev')}>
                {t('blog-pagination.previous')}
            </Button>
            <Button
                variant="contained"
                disabled={disabledNext}
                className={classes.next}
                onClick={() => handleChange('next')}
            >
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
