import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import clsx from 'clsx';
import PlFlag from '../assets/pl.png';
import EnFlag from '../assets/en.png';
import { backgroundColor, secondaryColor } from '../colors';

interface Props {
    language: string | null;
    extended: boolean;
}

export const LanguageSelector = ({ language, extended }: Props) => {
    const { i18n, t } = useTranslation();
    const classes = useStyles();

    const changeLanguage = (lng: string) => {
        moment.locale(lng);

        return i18n.changeLanguage(lng);
    };

    const languageImage = (flag: string, lang: string) => {
        return (
            <div className={classes.box} onClick={() => changeLanguage(lang)}>
                <img className={clsx({ [classes.img]: true, opened: extended })} src={flag} alt={lang} />
                {extended && (
                    <span className={clsx({ [classes.name]: true, opened: extended })}>
                        {t(`languages.${language}`)}
                    </span>
                )}
            </div>
        );
    };

    return (
        <Container className={clsx({ [classes.container]: true, opened: extended })}>
            {language === 'pl' ? languageImage(EnFlag, 'en') : languageImage(PlFlag, 'pl')}
        </Container>
    );
};

const useStyles = makeStyles({
    img: {
        '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 0 2px 0px #fff',
            transition: 'all 0.3s ease-in-out',
        },
    },
    container: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        bottom: 122,
        padding: 5,
        '&.opened': {
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '5px',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor,
                color: secondaryColor,
                transition: 'all 0.2s ease-in-out',
            },
        },
    },
    box: {
        display: 'flex',
    },
    name: {
        '&.opened': {
            marginLeft: 5,
        },
    },
});
