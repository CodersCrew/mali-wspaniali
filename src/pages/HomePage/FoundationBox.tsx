import React from 'react';
import { makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { mainColor } from '../../colors';

export const FoundationBox = () =>
{
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={ classes.FoundationBox }></div>
            <p className={ classes.FoundationText }>{ t( 'Najnowsze ARTYKUŁY' ) }</p>
        </>
    );
};

const useStyles = makeStyles({
    FoundationBox: {
        borderRadius: '4px',
    },
    FoundationText: {
        fontSize: '15px',
        color: mainColor
    },
});