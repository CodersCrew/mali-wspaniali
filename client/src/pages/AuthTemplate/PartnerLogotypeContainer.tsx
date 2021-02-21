import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Maker from '../../assets/authTemplateLogos/maker/maker.png';
import Ecm from '../../assets/authTemplateLogos/partners/e-cm-grey.png';
import Wroclaw from '../../assets/authTemplateLogos/partners/wroclaw.png';
import MinisterstwoSportu from '../../assets/authTemplateLogos/partners/ministerstwo-sportu.png';

export const PartnerLogotypeContainer = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    const partners = [Ecm, Wroclaw, MinisterstwoSportu];

    return (
        <div className={classes.partnersContainer}>
            <div className={classes.makerBox}>
                <div className={classes.header}>
                    <Typography variant="subtitle1">{t('login-wrapper.made-by')}</Typography>
                </div>
                <div className={classes.imageBox}>
                    <img src={Maker} alt="maker_logo" className={classes.image} />
                </div>
            </div>
            <div className={classes.partnersBox}>
                <div className={classes.header}>
                    <Typography variant="subtitle1">{t('login-wrapper.partners')}</Typography>
                </div>
                <div className={classes.partnersBoxWrapper}>
                    {partners.map((logo, key) => (
                        <div className={classes.imageBox} key={key}>
                            <img src={partners[key]} alt={`maker_logo_${key}`} className={classes.image} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        partnersContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
        },
        header: {
            marginBottom: theme.spacing(3),
        },
        makerBox: {
            width: 176,
            marginRight: theme.spacing(3),
        },
        partnersBoxWrapper: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        partnersBox: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        imageBox: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            width: 170,
            height: 70,
            padding: theme.spacing(0.5),
            borderRadius: 4,
        },
        image: {
            margin: 'auto',
            maxWidth: `calc(170px - 2 * ${theme.spacing(0.5)}px)`,
            maxHeight: `calc(70px - 2 * ${theme.spacing(0.5)}px)`,
            borderRadius: 4,
        },
    }),
);
