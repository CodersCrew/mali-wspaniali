import { createStyles, makeStyles, Theme, Typography, Box, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Maker from '../../assets/authTemplateLogos/maker/maker.png';
import Ecm from '../../assets/authTemplateLogos/partners/e-cm-grey.png';
import MinisterstwoSportu from '../../assets/authTemplateLogos/partners/ministerstwo-sportu-nowe.jpg';
import { useIsDevice } from '../../queries/useBreakpoints';

export const PartnerLogotypeContainer = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();

    const partners = [Ecm, MinisterstwoSportu];

    return (
        <div className={classes.partnersContainer}>
            <div className={classes.headerBox}>
                <div className={classes.headerMaker}>
                    <Typography variant={isDesktop ? 'subtitle1' : 'caption'}>{t('login-wrapper.made-by')}</Typography>
                    <Box mb={isDesktop ? 3 : 1} />
                </div>
                <div className={classes.headerPartners}>
                    <Typography variant={isDesktop ? 'subtitle1' : 'caption'}>{t('login-wrapper.partners')}</Typography>
                    <Box mb={isDesktop ? 3 : 1} />
                </div>
            </div>
            <div className={classes.makerBox}>
                <div className={classes.imageBox}>
                    <Link href="https://coderscrew.pl/" target="_blank">
                        <img src={Maker} alt="maker_logo" className={classes.image} />
                    </Link>
                </div>
            </div>
            <div className={classes.partnersBox}>
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
            gridTemplateColumns: '1fr 1fr 1fr',
            columnGap: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                columnGap: theme.spacing(1),
            },
        },
        headerBox: {
            width: '100%',
            gridColumnStart: 'span 3',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
        },
        headerMaker: {},
        headerPartners: {
            gridColumnStart: 'span 2',
        },
        makerBox: {},
        partnersBox: {
            width: '100%',
            gridColumnStart: 'span 2',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                columnGap: theme.spacing(1),
            },
        },
        imageBox: {
            minWidth: `calc(100% / 3 - 2 * ${theme.spacing(3)}px / 3)`,
            height: '70px',
            minHeight: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(0.5),
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            [theme.breakpoints.down('md')]: {
                minWidth: `calc(100% / 3 - 3 / 3 * ${theme.spacing(1)}px)`,
                height: '40px',
                minHeight: '40px',
                padding: theme.spacing(0.25),
            },
        },
        image: {
            maxWidth: `calc(100% - 2 * ${theme.spacing(0.5)}px)`,
            maxHeight: `calc(70px - 2 * ${theme.spacing(0.5)}px)`,
            [theme.breakpoints.down('md')]: {
                maxWidth: `calc(100% - 2 * ${theme.spacing(0.5)}px)`,
                maxHeight: `calc(40px - 2 * ${theme.spacing(0.5)}px)`,
            },
        },
    }),
);
