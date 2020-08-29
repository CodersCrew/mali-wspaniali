import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/';
import { Theme } from '../../theme/types';
import { ButtonPrimary } from '../../components/Button';
import { useTranslation } from 'react-i18next';

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
            />
            <ButtonPrimary
                variant="contained"
                disabled={disabledNext}
                className={classes.next}
                onClick={() => handleChange('next')}
                innerText={t('pagination.next')}
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
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
