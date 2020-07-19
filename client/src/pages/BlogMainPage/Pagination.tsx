import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/';
import { Theme } from '../../theme/types';
import { Button } from '../../components/Button';

interface Props {
    disabledPrevious: boolean;
    disabledNext: boolean;
    handleChange: (paginationDirection: string) => void;
}

export const Pagination = ({ disabledPrevious, disabledNext, handleChange }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.paginationContainer}>
            <Button
                color="primary"
                disabled={disabledPrevious}
                onClick={() => handleChange('prev')}
                innerText="blog-pagination.previous"
            />
            <Button
                color="primary"
                disabled={disabledNext}
                className={classes.next}
                onClick={() => handleChange('next')}
                innerText="blog-pagination.next"
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
        }
    }),
);
