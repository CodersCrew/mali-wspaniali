import { createStyles, makeStyles, Theme, Typography, Box, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Maker from '../../assets/authTemplateLogos/maker/maker.svg';
import Ecm from '../../assets/authTemplateLogos/partners/e-cm-grey.png';
import MinisterstwoSportu from '../../assets/authTemplateLogos/partners/ministerstwo-sportu-nowe.jpg';
import { useIsDevice } from '../../queries/useBreakpoints';

export const PartnerLogotypeContainer = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();

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
                    <Link href="https://coderscrew.pl/" target="_blank" className={classes.link}>
                        <img src={CodersCrew} alt="CodersCrew" className={classes.image} />
                    </Link>
                </div>
            </div>
            <div className={classes.partnersBox}>
                <div className={classes.imageBox}>
                    <Link href="https://www.wroclaw.pl/" target="_blank" className={classes.link}>
                        <img src={Wroclaw} alt="Wrocław" className={classes.image} />
                    </Link>
                </div>
                <div className={classes.imageBox}>
                    <Link href="https://www.gov.pl/web/kulturaisport" target="_blank" className={classes.link}>
                        <img src={MinisterstwoSportu} alt="Ministerstwo Sportu" className={classes.image} />
                    </Link>
                </div>
                <div className={classes.imageBox}>
                    <Link href="http://e-cm.pl/" target="_blank" className={classes.link}>
                        <img src={Ecm} alt="e-cm.pl" className={classes.image} />
                    </Link>
                </div>
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
            gridTemplateColumns: '1fr 1fr 1fr',
            columnGap: theme.spacing(2),
            rowGap: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                columnGap: theme.spacing(1),
            },
        },
        imageBox: {
            minWidth: `calc(100% / 3 - 2 * ${theme.spacing(3)}px / 3)`,
            height: '70px',
            minHeight: '70px',
            display: 'flex',
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
        link: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        image: {
            width: '100%',
            maxWidth: `calc(100% - 2 * ${theme.spacing(0.5)}px)`,
            maxHeight: `calc(70px - 2 * ${theme.spacing(0.5)}px)`,
            [theme.breakpoints.down('md')]: {
                maxWidth: `calc(100% - 2 * ${theme.spacing(0.5)}px)`,
                maxHeight: `calc(40px - 2 * ${theme.spacing(0.5)}px)`,
            },
        },
    }),
);
