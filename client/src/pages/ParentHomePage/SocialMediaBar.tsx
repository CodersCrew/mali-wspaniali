import { Box, Link, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Facebook, YouTube } from '@material-ui/icons';

export function SocialMediaBar() {
    const { t } = useTranslation();

    return (
        <Box width="223px" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1" align="right">
                {t('home-page-content.visit')}
            </Typography>
            <Link href="https://www.facebook.com/maliwspanialifundacja" target="_blank">
                <Facebook fontSize="large" style={{ fill: '#3b5998' }} />
            </Link>
            <Link href="https://www.youtube.com/channel/UC8_5pq7EqIwJZNBRPtEEqwQ" target="_blank">
                <YouTube fontSize="large" style={{ fill: '#FF0000' }} />
            </Link>
        </Box>
    );
}
