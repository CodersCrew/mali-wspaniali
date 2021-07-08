import { makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { BasicModal } from '../../../components/Modal/BasicModal';
import Logo from '../../../assets/MALWSP_logo_black_name.png';
import SocialMediaBar from '../SocialMediaBar';

export function ContactModal() {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            isOpen={true}
            actionName={t('edit-kindergarten-modal.close')}
            onClose={() => {
                console.log('x');
            }}
            isCancelButtonVisible={false}
            isActionButtonVisible={true}
        >
            <div className={classes.innerContent}>
                <Box display="flex" flexDirection="row">
                    <Box display="flex" flexDirection="column" width="50%">
                        <Typography variant="h4">{t('home-page-content.footer.contact')}</Typography>

                        <img src={Logo} alt="logo MALWSP" className={classes.logo} />
                        <Typography variant="body1">
                            Fundacja Mali Wspaniali <br /> Ślężna 2 - 24, Wrocław, 53-302 <br />
                            <br />
                            +48 510 454 457 <br /> biuro@mali-wspaniali.pl
                        </Typography>
                    </Box>{' '}
                    <Box display="flex" flexDirection="column" width="40%" justifyContent="center" alignItem="flex-end">
                        <SocialMediaBar />
                    </Box>
                </Box>
            </div>
        </BasicModal>
    );
}

export const useStyles = makeStyles((theme: Theme) => ({
    innerContent: {
        minWidth: 684,
    },
    logo: {
        height: theme.spacing(10),
        width: '218px',
    },
}));
