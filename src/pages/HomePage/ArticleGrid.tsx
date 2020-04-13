import React from 'react';
import { makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

export const ArticleGrid = () =>
{
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={ classes.ArticleBox }>

            </div>
        </>
    );
};

const useStyles = makeStyles({
    ArticleBox: {
        borderRadius: '20px',
        backgroundColor: '#f1f2f4',
    },
    ButtonContainedSmallIconLeftPrimaryHover: {
        borderRadius: '4px',
        backgroundColor: '#ff7149',
    }
});