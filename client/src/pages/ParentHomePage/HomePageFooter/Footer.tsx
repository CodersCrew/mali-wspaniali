import { makeStyles, createStyles, Box, Link, Typography, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CCLogo from '../../../assets/authTemplateLogos/maker/maker.png';
import { Theme } from '../../../theme';

export default function Footer() {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Paper>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around"
                className={classes.container}
            >
                <Link className={classes.link} href="http://mali-wspaniali.pl/pl/index.html" target="_blank">
                    {t('home-page-content.footer.contact')}
                </Link>
                <Link className={classes.link} href="http://mali-wspaniali.pl/pl/index.html" target="_blank">
                    {t('home-page-content.footer.privacy')}
                </Link>
                <Typography variant="subtitle1">|</Typography>
                <Typography variant="caption">{t('home-page-content.footer.rights-reserved')} </Typography>

                <Typography variant="caption">Designed and Developed by</Typography>
                <img src={CCLogo} alt="Logo CodersCrew" className={classes.logo} />
            </Box>
        </Paper>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            height: theme.spacing(7),
        },
        link: {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        logo: {
            height: theme.spacing(3),
        },
    }),
);
