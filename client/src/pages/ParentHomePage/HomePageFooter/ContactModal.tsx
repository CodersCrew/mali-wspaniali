import { makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../../components/Modal/BasicModal';
import Logo from '../../../assets/MALWSP_logo_black_name.png';
import { SocialMediaBar } from '../SocialMediaBar';
import { ActionDialog, openDialog } from '../../../utils/openDialog';
import { useBreakpoints } from '../../../queries/useBreakpoints';

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
            dialogProps={{ fullScreen: false }}
        >
            <div className={classes.innerContent}>
                <Box
                    display="flex"
                    flexDirection={device === 'DESKTOP' ? 'row' : 'column'}
                    justifyContent={device === 'DESKTOP' ? 'space-between' : 'space-around'}
                >
                    <Box display="flex" flexDirection="column" width={device === 'DESKTOP' ? 'fit-content' : '100%'}>
                        <Typography variant="h4">{t('home-page-content.footer.contact')}</Typography>

                        <img src={Logo} alt="logo MALWSP" className={classes.logo} />
                        <Typography variant="body1">
                            Fundacja Mali Wspaniali <br /> Ślężna 2 - 24, Wrocław, 53-302 <br />
                            <br />
                            +48 510 454 457 <br /> biuro@mali-wspaniali.pl
                        </Typography>
                    </Box>{' '}
                    <Box
                        display="flex"
                        flexDirection="column"
                        width={device === 'DESKTOP' ? 'fit-content' : '100%'}
                        justifyContent="center"
                        alignItems={device === 'DESKTOP' ? 'flex-end' : 'center'}
                        className={classes.social}
                    >
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
    },
    title: {
        padding: theme.spacing(2, 0),
    },
    logo: {
        height: theme.spacing(10),
        width: '218px',
        margin: theme.spacing(2, 0),
        [theme.breakpoints.down('xs')]: {
            alignSelf: 'center',
        },
    },
    social: {
        marginTop: theme.spacing(1),
    },
}));
