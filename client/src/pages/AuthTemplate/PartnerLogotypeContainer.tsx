import React from 'react';
import { createStyles, makeStyles, Theme, Typography, Box } from '@material-ui/core';
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
                <div className={classes.headerMaker}>
                    <Typography variant="subtitle1">{t('login-wrapper.made-by')}</Typography>
                    <Box mb={3} />
                </div>
                <div className={classes.imageBox}>
                    <img src={Maker} alt="maker_logo" className={classes.image} />
                </div>
            </div>
            <div className={classes.partnersBox}>
                <div className={classes.headerPartners}>
                    <Typography variant="subtitle1">{t('login-wrapper.partners')}</Typography>
                    <Box mb={3} />
                </div>
                {partners.map((logo, key) => (
                    <div className={classes.imageBox} key={key}>
                        <img src={partners[key]} alt={`maker_logo_${key}`} className={classes.image} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        partnersContainer: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            columnGap: theme.spacing(3),
        },
        headerMaker: {},
        headerPartners: {
            gridColumnStart: 'span 3',
        },
        makerBox: {},
        partnersBox: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            columnGap: theme.spacing(3),
        },
        imageBox: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(0.5),
            backgroundColor: theme.palette.background.paper,
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
