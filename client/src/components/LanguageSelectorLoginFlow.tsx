import { useTranslation } from 'react-i18next';
import { makeStyles, IconButton } from '@material-ui/core';

import PlFlag from '@app/assets/pl.svg';
import EnFlag from '@app/assets/en.svg';

export function LanguageSelectorLoginFlow() {
    const { i18n } = useTranslation();
    const classes = useStyles();
    const localStorageLanguage = localStorage.getItem('i18nextLng');

    return (
        <div className={classes.container}>
            <IconButton>
                {localStorageLanguage === 'pl' ? languageImage(EnFlag, 'en') : languageImage(PlFlag, 'pl')}
            </IconButton>
        </div>
    );

    function languageImage(flag: string, language: string) {
        return <img className={classes.img} src={flag} alt={language} onClick={() => changeLanguage(language)} />;
    }

    function changeLanguage(lng: string) {
        return i18n.changeLanguage(lng);
    }
}

const useStyles = makeStyles({
    img: {
        objectFit: 'cover',
        height: 24,
        width: 24,
        borderRadius: '50%',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
