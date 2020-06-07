import { makeStyles, createStyles, Theme } from '@material-ui/core/';
import {
    backgroundColor,
    secondaryColor,
    mainColor,
    textColor,
    white,
} from '../../../colors';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',

            '&.agreements': {
                padding: '36px 0 40px 0',
            },
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
        headerContainer: {
            display: 'flex',
            marginBottom: '25px',
            justifyContent: 'center',
            alignItems: 'center',

            '@media (max-width:767px)': {
                marginTop: '40px',
                marginBottom: '5px',
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
            textTransform: 'uppercase',
            color: textColor,

            '@media (max-width:767px)': {
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
        chipsContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            justifyItems: 'start',
            marginTop: '10px',
        },
        chip: {
            margin: '5px 0',
            border: 0,

            '&.checked': {
                color: mainColor,
            },
        },
        agreementContainer: {
            marginLeft: 12,
            paddingRight: 15,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 600,
            overflowY: 'scroll',
        },
        agreementHeader: {
            fontSize: 21,
            fontWeight: 'normal',
            margin: '12px 0 0 0',
        },
        agreementMoreBtn: {
            color: mainColor,
            justifyContent: 'flex-start',
            fontSize: 16,
            paddingLeft: 0,
        },
        agreementCheckboxHeader: {
            margin: '10px 0 12px 0',
            fontSize: 21,
            fontWeight: 500,
        },
        agreementCheckboxWrapper: {
            marginTop: 17,
            display: 'flex',
            flexDirection: 'column',

            '&.lastAgreement': {
                margin: 0,
                borderBottom: '1px solid #C4C4C4',
            },
        },
        agreementText: {
            margin: '0 0 7px 0',
        },
        agreementLink: {
            color: mainColor,
        },
        agreementModal: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        agreementPanel: {
            margin: '0 0 10px 34px',
        },
        agreementCheckbox: {
            paddingTop: 0,
        },
        checkboxContent: {
            display: 'flex',
            alignItems: 'end',
        },
    })
);
