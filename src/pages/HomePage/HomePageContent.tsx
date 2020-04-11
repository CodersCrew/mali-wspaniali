import React from 'react';
import {  makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { mainColor, backgroundColor, textColor } from '../../colors';

export const HomePageContent = () => {
    const classes = useStyles();

    const { t } = useTranslation();


    return (
        <>
            <div className={ classes.ContentContainer }>
                <div className={ classes.GoodAfternoonBox }>{ t('Dzien Dobry!') }</div>
                <div className={ classes.CheckChildrenActivityBox }>{ t('Sprawdź aktywność swoich dzieci w programie') } <p className={ classes.maliWspanialiText }>Mali Wspaniali</p></div>
                <div className = {classes.bodyItems}>
                    <div className={ classes.ChildrenAva }>{ t('Władysław') }</div>
                    <div className={ classes.ChildrenAva }>{ t('Małgorzata') }</div>
                    <div className={ classes.FoundationBox }></div>
                    <p className={ classes.ArticleText }>{ t('Najnowsze ARTYKUŁY') }</p>
                    <div className={ classes.ArticleBox }>
                        <p className={ classes.ArticleText }>{ t('Tutaj będzie nazwa, która jest przeważnie bardzo długa') }</p>
                        <p className={ classes.ArticleText }>{ t('Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.') }</p>
                    </div>
                    <div className={ classes.ArticleBox }>
                        <p className={ classes.ArticleText }>{ t('Tutaj będzie nazwa, która jest przeważnie bardzo długa') }</p>
                        <p className={ classes.ArticleText }>{ t('Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.') }</p>
                        <button className = { classes.ButtonContainedSmallIconLeftPrimaryHover}>{ t('Czytaj Dalej') }</button>
                    </div>
                </div>
            </div>
        </>
    );
};

const useStyles = makeStyles({
    ContentContainer: {
        borderRadius: '20px',
        backgroundColor,
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

    maliWspanialiText: {
        fontWeight: 'bold',
        color: mainColor
    },
    bodyItems: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
    },
    ChildrenAva: {
        borderRadius: '8px',
    },
    FoundationBox: {
        borderRadius: '4px',
    },
    ArticleText: {
        fontSize: '15px',
        color: mainColor
    },
    ArticleBox: {
        borderRadius: '20px',
        backgroundColor: '#f1f2f4',
    },
    ButtonContainedSmallIconLeftPrimaryHover: {
        borderRadius: '4px',
        backgroundColor: '#ff7149',
    }
});
