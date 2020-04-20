/* eslint-disable react/no-children-prop */
import React from 'react';
import { makeStyles } from '@material-ui/core/';
import { mainColor, backgroundColor, textColor } from '../../colors';
import { ArticleGrid } from './ArticleGrid';
import { useAuthorization } from '../../hooks/useAuthorization';
import { ChildrenGrid } from './ChildrenGrid';
import { FoundationBox } from './FoundationBox';

export const HomePageContent = () => {
    useAuthorization(true);
    const classes = useStyles();

    return (
        <>
            <div className={classes.ContentContainer}>
                <div className={classes.GoodAfternoonBox}>Dzien Dobry!</div>
                <div className={classes.CheckChildrenActivityBox}>
                    Sprawdź aktywność swoich dzieci w programie
                    <span className={classes.MaliWspanialiText}>Mali Wspaniali</span>
                </div>
                <div className={classes.BodyUpperItems}>
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
        position: 'absolute',
        top: '10px',
        left: '240px',
        paddingLeft: '61px',
        fontFamily: 'Montserrat, sans-serif',
    },
    GoodAfternoonBox: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: textColor,
        marginTop: '51px',
    },

    CheckChildrenActivityBox: {
        fontFize: '21px',
        fontWeight: 500,
        color: textColor,
        marginTop: '20px',
    },

    MaliWspanialiText: {
        fontWeight: 'bold',
        color: mainColor,
        marginLeft: '5px',
    },
    BodyUpperItems: {
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content',
        height: 'fit-content',
    },
});
