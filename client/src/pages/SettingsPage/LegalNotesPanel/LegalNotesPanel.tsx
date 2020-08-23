import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const LegalNotesPanel = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Typography color={'primary'}>
            <ul className={classes.ul}>
                <li className={classes.li}>{t('settings-page.parent.legal-notes.privacy-policy')}</li>
                <li className={classes.li}>{t('settings-page.parent.legal-notes.regulations')}</li>
            </ul>
        </Typography>
    );
};

const useStyles = makeStyles({
    li: {
        verticalAlign: 'middle',
        lineHeight: '120%',
        fontSize: '15px',
        padding: '9px',
    },
    ul: {
        margin: '0',
    },
});
