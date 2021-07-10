import { makeStyles, createStyles, Box, Typography, Paper, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import CCLogo from '../../../assets/authTemplateLogos/maker/maker.png';
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
                    {device === 'DESKTOP' ? '' : <Typography variant="subtitle1">|</Typography>}
                    <Button className={classes.link}>{t('home-page-content.footer.privacy')}</Button>
                    {device === 'DESKTOP' ? (
                        <Typography variant="subtitle1" className={classes.separator}>
                            |
                        </Typography>
                    ) : (
                        ''
                    )}
                </Box>

                <Typography variant="caption">{t('home-page-content.footer.rights-reserved')} </Typography>

                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    pb={device === 'MOBILE' ? 2 : 0}
                >
                    <Typography variant="caption">Designed and Developed by</Typography>
                    <img src={CCLogo} alt="Logo CodersCrew" className={classes.logo} />
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
        },
        logo: {
            height: theme.spacing(3),
            [theme.breakpoints.down('md')]: {
                height: theme.spacing(2),
            },
            marginLeft: theme.spacing(1),
        },
        separator: {
            opacity: '54%',
        },
    }),
);
