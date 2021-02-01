import React from 'react';
import { IconButton, createStyles, makeStyles } from '@material-ui/core';

import PlFlag from '../assets/pl.png';
import EnFlag from '../assets/en.png';

interface Props {
    language: string | null;
    onClick: (lang: string) => void;
}

export const LanguageSelector = ({ language, onClick }: Props) => {
    const classes = useStyles();

    const languageImage = (flag: string, lang: string) => {
        return (
            <IconButton aria-label="change language" onClick={() => onClick(lang)}>
                <img src={flag} alt={lang} className={classes.flag} />
            </IconButton>
        );
    };

    return <div>{language === 'pl' ? languageImage(EnFlag, 'en') : languageImage(PlFlag, 'pl')}</div>;
};

const useStyles = makeStyles(() =>
    createStyles({
        flag: {
            borderRadius: '50%',
            width: 18,
            height: 18,
        },
    }),
);
