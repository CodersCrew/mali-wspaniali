/* eslint-disable react/no-children-prop */
import React from 'react';
import {  makeStyles } from '@material-ui/core/';
import { mainColor, backgroundColor, textColor } from '../../colors';
import { FoundationBox } from './FoundationBox';
import { ArticleGrid } from './ArticleGrid/ArticleGrid';
import { useAuthorization } from '../../hooks/useAuthorization';
import { ChildrenGrid } from './ChildrenGrid/ChildrenGrid';

export const HomePageContent = () => {
    const classes = useStyles();

    return (
        <>
            <div className={ classes.ContentContainer }>
                <div className={ classes.GoodAfternoonBox }>Dzien Dobry!</div>
                <div className={ classes.CheckChildrenActivityBox }>Sprawdź aktywność swoich dzieci w programie<span className={ classes.MaliWspanialiText }>Mali Wspaniali</span></div>
                <div className={ classes.BodyUpperItems }>
                    <ChildrenGrid />

                    <FoundationBox />
                </div>

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
        width: 'fit-content',
        height: 'fit-content'
    }
});
