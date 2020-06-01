import { makeStyles, createStyles, Theme } from '@material-ui/core/';
import { backgroundColor, secondaryColor, textColor, white } from '../../../colors';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            minHeight: '90vh',

            '@media (max-width:767px)': {
                minHeight: 'auto',
                width: '100%',
                margin: '0 15px',
            },
        },
        formItem: {
            margin: '10px 0',
            width: '100%',

            '@media (max-width:767px)': {
                margin: '10px 0',
            },
        },
        stepper: {
            '@media (max-width:767px)': {
                marginTop: 15,
            },
        },
        registrationHeader: {
            textAlign: 'center',
            fontSize: '21px',
            fontWeight: 'bold',
            marginBottom: '25px',
            textTransform: 'uppercase',
            color: textColor,

            '@media (max-width:767px)': {
                marginTop: '40px',
                marginBottom: '5px',

                '&.confirmation': {
                    marginTop: 0,
                },
            },
        },
        buttonWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: 33,
            margin: '20px 0',

            '&.emailContent': {
                justifyContent: 'flex-end',
            },

            '@media (max-width:767px)': {
                margin: '10px 0 20px 0',
            },
        },
        confirmWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '30px',
        },
        nextButton: {
            color: backgroundColor,
            fontWeight: 'bold',

            '@media (max-width:767px)': {
                '& span': {
                    maxHeight: 17,
                },
            },
        },
        prevButton: {
            color: secondaryColor,
            fontWeight: 'bold',
        },
        goToHomepageLink: {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '17px',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: white,
            background: secondaryColor,
            textDecoration: 'none',
            borderRadius: '4px',
            padding: '4px 10px',
            marginTop: '50px',
            boxShadow: theme.shadows[5],
        },
    })
);
