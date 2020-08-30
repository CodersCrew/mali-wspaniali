import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import PlFlag from '../../../assets/pl.png';
import EnFlag from '../../../assets/en.png';
import { white } from '../../../colors';

export const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const classes = useStyles();
    const localStorageLanguage = localStorage.getItem('i18nextLng');

    const changeLanguage = (lng: string) => {
        return i18n.changeLanguage(lng);
    };

    const languageImage = (flag: string, language: string) => (
        <img
            className={classes.img}
            src={flag}
            alt={language}
            onClick={() => changeLanguage(language)}
        />
    );

    return (
        <div className={classes.container}>
            {localStorageLanguage === 'pl'
                ? languageImage(EnFlag, 'en')
                : languageImage(PlFlag, 'pl')}
        </div>
    );
};

const useStyles = makeStyles({
    img: {
        '&:hover': {
            cursor: 'pointer',
            boxShadow: `0 0 2px 0px ${white}`,
            transition: 'all 0.3s ease-in-out',
        },
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '32px',
    },
});
