import { createStyles, makeStyles, Theme, Typography, Box, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import MakerLogotype from '../../assets/authTemplateLogos/maker/maker.png';
import EcmLogotype from '../../assets/authTemplateLogos/partners/e-cm-grey.png';
import MinisterstwoSportuLogotype from '../../assets/authTemplateLogos/partners/ministerstwo-sportu-nowe.jpg';
import WroclawLogotype from '../../assets/authTemplateLogos/partners/wroclaw-miasto-spotkan.svg';
import { useIsDevice } from '../../queries/useBreakpoints';

type UseStylesProps = {
    visiblePartners: number;
};

export const PartnerLogotypeContainer = (): JSX.Element => {
    const { t } = useTranslation();
    const { isDesktop, isSmallMobile } = useIsDevice();

    const partners = [WroclawLogotype, MinisterstwoSportuLogotype, EcmLogotype];
    const visiblePartners = isSmallMobile ? 2 : 3;

    const classes = useStyles({ visiblePartners });

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
                        <img src={MakerLogotype} alt="maker_logo" className={classes.image} />
                    </Link>
                </div>
            </div>
            <div className={classes.partnersBox}>
                {partners.map((logo, key) => (
                    <div
                        className={clsx({ [classes.imageBox]: true, [classes.invisible]: key >= visiblePartners })}
                        key={key}
                    >
                        <img src={partners[key]} alt={`maker_logo_${key}`} className={classes.image} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        partnersContainer: ({ visiblePartners }: UseStylesProps) => ({
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${visiblePartners + 1}, 1fr)`,
            columnGap: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                columnGap: theme.spacing(1),
            },
        }),

        headerBox: ({ visiblePartners }: UseStylesProps) => ({
            width: '100%',
            display: 'grid',
            gridColumnStart: `span ${visiblePartners + 1}`,
            gridTemplateColumns: `repeat(${visiblePartners + 1}, 1fr)`,
        }),
        headerMaker: {},
        headerPartners: ({ visiblePartners }: UseStylesProps) => ({
            gridColumnStart: `span ${visiblePartners}`,
        }),

        makerBox: {},
        partnersBox: ({ visiblePartners }: UseStylesProps) => ({
            width: '100%',
            display: 'grid',
            gridColumnStart: `span ${visiblePartners}`,
            gridTemplateColumns: `repeat(${visiblePartners}, 1fr)`,
            columnGap: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                columnGap: theme.spacing(1),
            },
        }),
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

        invisible: {
            display: 'none',
        },
    }),
);
