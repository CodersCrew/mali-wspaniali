import { IconButton, createStyles, makeStyles } from '@material-ui/core';

import PlFlag from '../assets/pl.svg';
import EnFlag from '../assets/en.svg';

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
            objectFit: 'cover',
            borderRadius: '50%',
            width: 24,
            height: 24,
        },
    }),
);
