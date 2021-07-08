import { Typography, Link, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Facebook from '../../assets/socialMedia/Facebook.png';
import Youtube from '../../assets/socialMedia/Youtube.png';

export default function SocialMediaBar() {
    const { t } = useTranslation();

    return (
        <Box width="223px" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1" align="right">
                {t('home-page-content.visit')}
            </Typography>
            <Link href="https://www.facebook.com/maliwspanialifundacja" target="_blank">
                <img src={Facebook} alt="ikona Facebooka" />
            </Link>
            <Link href="https://www.youtube.com/channel/UC8_5pq7EqIwJZNBRPtEEqwQ" target="_blank">
                <img src={Youtube} alt="ikona Youtube" />
            </Link>
        </Box>
    );
}
