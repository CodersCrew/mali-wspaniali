import { makeStyles, createStyles, Box, Typography, Paper, Button, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import CCLogo from '../../../assets/authTemplateLogos/maker/coders-crew.svg';
import { Theme } from '../../../theme';
import { useBreakpoints } from '../../../queries/useBreakpoints';

import { openContactModal } from './ContactModal';

export function Footer() {
    const { t } = useTranslation();
    const classes = useStyles();
    const device = useBreakpoints();

    return (
        <Paper>
            <Box
                display="flex"
                flexDirection={device !== 'MOBILE' ? 'row' : 'column'}
                alignItems="center"
                justifyContent="space-around"
                className={classes.container}
            >
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Button className={classes.link} onClick={openContactModal}>
                        {t('home-page-content.footer.contact')}
                    </Button>
                    {device === 'DESKTOP' ? '' : <Typography variant="subtitle1">|</Typography>}&nbsp;&nbsp;&nbsp;
                    <Link href="/docs/polityka_prywatnosci_pl.pdf" className={classes.link} target="_blank">
                        {t('home-page-content.footer.privacy')}
                    </Link>
                </Box>

                {device === 'DESKTOP' ? (
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                        <Typography variant="subtitle1" className={classes.separator}>
                            |
                        </Typography>
                    </Box>
                ) : (
                    ''
                )}

                <Typography variant="caption">{t('home-page-content.footer.rights-reserved')} </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    pb={device === 'MOBILE' ? 2 : 0}
                >
                    <Typography variant="caption">Designed and Developed by</Typography>
                    <Link href="https://coderscrew.pl/" target="_blank">
                        <img src={CCLogo} alt="Logo CodersCrew" className={classes.logo} />
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            height: theme.spacing(7),
            [theme.breakpoints.down('lg')]: {
                height: theme.spacing(10),
            },
            [theme.breakpoints.down('xs')]: {
                height: theme.spacing(14),
            },
        },
        link: {
            fontWeight: theme.typography.button.fontWeight,
            color: theme.palette.primary.light,
            textTransform: 'uppercase',
        },
        logo: {
            height: theme.spacing(8),
            [theme.breakpoints.down('md')]: {
                height: theme.spacing(5),
            },
            marginLeft: theme.spacing(1),
        },
        separator: {
            opacity: '54%',
            margin: 'auto',
        },
    }),
);
