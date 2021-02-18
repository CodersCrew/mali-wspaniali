import React from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface Props {
    count: number;
    maxCount: number;
    onClick: () => void;
    disabled?: boolean;
    hidden?: boolean;
}

export const Pagination = ({ disabled, hidden, count, maxCount, onClick }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    if (hidden) return null;

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <div className={classes.counter}>{t('blog-pagination.counter', { from: count, to: maxCount })}</div>
                <div>
                    <Button
                        className={classes.buttonShowMore}
                        variant="outlined"
                        color="secondary"
                        disabled={disabled}
                        onClick={onClick}
                    >
                        {t('blog-pagination.show-more')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
        },
        innerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        counter: {
            paddingBottom: theme.spacing(3),
            userSelect: 'none',
            cursor: 'default',
        },
        buttonShowMore: {
            marginBottom: theme.spacing(4),
        },
    }),
);
