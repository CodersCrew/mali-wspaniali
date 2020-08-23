import React from 'react';
import { IconButton } from '@material-ui/core';

import PlFlag from '../assets/pl.png';
import EnFlag from '../assets/en.png';

interface Props {
    language: string | null;
    onClick: (lang: string) => void;
}

export const LanguageSelector = ({ language, onClick }: Props) => {
    const languageImage = (flag: string, lang: string) => {
        return (
            <IconButton aria-label="change language" onClick={() => onClick(lang)}>
                <img src={flag} alt={lang} />
            </IconButton>
        );
    };

    return <div>{language === 'pl' ? languageImage(EnFlag, 'en') : languageImage(PlFlag, 'pl')}</div>;
};
