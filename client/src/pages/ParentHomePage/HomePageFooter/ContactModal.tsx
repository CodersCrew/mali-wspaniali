import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ActionDialog, openDialog } from '../../../utils/openDialog';
import { BasicModal } from '../../../components/Modal/BasicModal';
import { useBreakpoints } from '../../../queries/useBreakpoints';
import { SocialMediaBar } from '../SocialMediaBar';

import Logo from '../../../assets/MALWSP_logo_black_name.png';

export const openContactModal = () => {
    return openDialog(ContactModal);
};

export function ContactModal({ onClose }: ActionDialog) {
    const { t } = useTranslation();
    const classes = useStyles();
    const device = useBreakpoints();

    return (
        <BasicModal
            isOpen={true}
            actionName={t('edit-kindergarten-modal.close')}
            onAction={() => {
                onClose();
            }}
            onClose={onClose}
            isCancelButtonVisible={false}
            isActionButtonVisible={true}
        >
            <div className={classes.innerContent}>
                <Box
                    display="flex"
                    flexDirection={device === 'DESKTOP' ? 'row' : 'column'}
                    justifyContent={device === 'DESKTOP' ? 'space-between' : 'space-around'}
                >
                    <Box display="flex" flexDirection="column" width={device === 'DESKTOP' ? 'fit-content' : '100%'}>
                        <Typography variant="h4">{t('home-page-content.footer.contact')}</Typography>

                        <img src={Logo} alt="MALWSP logo" className={classes.logo} />
                        <Typography variant="body1">Fundacja Mali Wspaniali </Typography>
                        <Typography variant="body1">Ślężna 2 - 24, Wrocław, 53-302 </Typography>
                        <Box mb={2} />
                        <Typography variant="body1">+48 510 454 457</Typography>
                        <Typography variant="body1">fundacja@mali-wspaniali.pl</Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        width={device === 'DESKTOP' ? 'fit-content' : '100%'}
                        justifyContent="center"
                        alignItems={device === 'MOBILE' ? 'center' : 'flex-end'}
                        className={classes.social}
                    >
                        {device === 'DESKTOP' && <Box height="25%" />}
                        <SocialMediaBar />
                    </Box>
                </Box>
            </div>
        </BasicModal>
    );
}

export const useStyles = makeStyles((theme: Theme) => ({
    innerContent: {
        [theme.breakpoints.up('sm')]: {
            minWidth: 572,
        },
        [theme.breakpoints.down('sm')]: {
            height: '80%',
        },
    },
    title: {
        padding: theme.spacing(2, 0),
    },
    logo: {
        height: theme.spacing(10),
        width: '218px',
        margin: theme.spacing(2, 0),
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'center',
            margin: theme.spacing(5, 0),
        },
    },
    social: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(5),
        },
    },
}));
