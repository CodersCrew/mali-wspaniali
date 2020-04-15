/* eslint-disable react/no-children-prop */
import React from 'react';
import {  makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { mainColor, backgroundColor, textColor } from '../../colors';
import { FoundationBox } from './FoundationBox';
import { ArticleGrid } from './ArticleGrid/ArticleGrid';
import { useAuthorization } from '../../hooks/useAuthorization';
import { ChildrenGrid } from './ChildrenGrid/ChildrenGrid';

export const HomePageContent = () => {
    useAuthorization(true);
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={ classes.ContentContainer }>
                <div className={ classes.GoodAfternoonBox }>{ t('Dzien Dobry!') }</div>
                <div className={ classes.CheckChildrenActivityBox }>{ t('Sprawdź aktywność swoich dzieci w programie') } <span className={ classes.MaliWspanialiText }>Mali Wspaniali</span></div>
                <div className={ classes.BodyUpperItems }>
                    <ChildrenGrid />
                </div>
                <FoundationBox />

                <ArticleGrid />
            </div>
        </>
    );
};

const useStyles = makeStyles({
    ContentContainer: {
        borderRadius: '20px',
        backgroundColor,
        marginLeft: '61px',
        marginTop: '51px',
    },
    GoodAfternoonBox: {
        fontFamily: 'Montserrat',
        fontSize: '36px',
        fontWeight: 'bold',
        color: textColor,
    },

    CheckChildrenActivityBox: {
        fontFamily: 'Montserrat',
        fontFize: '21px',
        fontWeight: 500,
        color: textColor,
    },

    MaliWspanialiText: {
        fontWeight: 'bold',
        color: mainColor
    },
    BodyUpperItems: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
    }
});
