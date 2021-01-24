import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useTranslation } from 'react-i18next';

import { darkGray } from '../../../../../colors';

export const NoResultsBlock = ({ translationKey }: { translationKey: string }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.wrapper}>
            <InfoOutlinedIcon className={classes.icon} />
            {t(`child-profile.tests-in-block.${translationKey}`)} {t('child-profile.no-result-block-text')}
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        color: darkGray,
        border: `1px solid ${darkGray}`,
        borderRadius: '4px',
        marginTop: '10px',
        padding: '16px',
        marginRight: '30px',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '10px',
    },
});
