import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '../../components/Button';

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
            <ButtonPrimary
                variant="contained"
                disabled={disabledPrevious}
                onClick={() => handleChange('prev')}
                innerText={t('pagination.previous')}
                color="primary"
            />
            <ButtonPrimary
                variant="contained"
                disabled={disabledNext}
                className={classes.next}
                onClick={() => handleChange('next')}
                innerText={t('pagination.next')}
                color="primary"
            />
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
            marginLeft: '2%',
        },
    }),
);
