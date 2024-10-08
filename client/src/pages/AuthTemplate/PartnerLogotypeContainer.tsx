import { createStyles, makeStyles, Theme, Typography, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import CodersCrew from '@app/assets/authTemplateLogos/maker/coders-crew.svg';
import Ecm from '@app/assets/authTemplateLogos/partners/e-cm-grey.png';
import MinisterstwoSportu from '@app/assets/authTemplateLogos/partners/ministerstwo-sportu.png';
import Wroclaw from '@app/assets/authTemplateLogos/partners/wroclaw-miasto-spotkan.svg';

import { useIsDevice } from '@app/queries/useBreakpoints';

export const PartnerLogotypeContainer = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();

    return (
        <div className={classes.partnersContainer}>
            <div className={classes.headerMaker}>
                <Typography variant={isDesktop ? 'subtitle1' : 'caption'}>{t('login-wrapper.made-by')}</Typography>
            </div>
            <div className={classes.strategicPartners}>
                <Typography variant={isDesktop ? 'subtitle1' : 'caption'}>{t('login-wrapper.partners')}</Typography>
            </div>
            <div className={classes.financialPartners}>
                <Typography variant={isDesktop ? 'subtitle1' : 'caption'}>
                    {t('login-wrapper.financial-partners')}
                </Typography>
            </div>
            <div className={classes.imageBox}>
                <Link href="https://coderscrew.pl/" target="_blank" className={classes.link}>
                    <img src={CodersCrew} alt="CodersCrew" className={classes.image} />
                </Link>
            </div>
            <div className={classes.imageBox}>
                <Link href="http://e-cm.pl/" target="_blank" className={classes.link}>
                    <img src={Ecm} alt="e-cm.pl" className={classes.image} />
                </Link>
            </div>
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
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        partnersContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gridGap: '1em',
        },
        headerBox: {
            width: '100%',
            gridColumnStart: 'span 3',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
        },
        headerMaker: {
            alignSelf: 'end',
        },
        financialPartners: {
            gridColumn: '3/5',
            alignSelf: 'end',
        },
        strategicPartners: {
            alignSelf: 'end',
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
