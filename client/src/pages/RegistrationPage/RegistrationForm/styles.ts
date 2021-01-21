import { makeStyles, createStyles, Theme } from '@material-ui/core/';
import { secondaryColor, mainColor, textColor, white } from '../../../colors';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            minHeight: '100vh',
            padding: theme.spacing(0, 2),
            [theme.breakpoints.down('md')]: {
                justifyContent: 'start',
            },
        },
        form: {},
        headerContainer: {
            display: 'flex',
            marginBottom: '25px',
            justifyContent: 'center',
            alignItems: 'center',

            [theme.breakpoints.down('sm')]: {
                marginTop: '40px',
                marginBottom: '5px',
            },
        },
        formItem: {
            margin: '10px 0',
            width: '100%',

            [theme.breakpoints.down('sm')]: {
                margin: '10px 0',
            },
        },
        stepper: {
            backgroundColor: theme.palette.background.default,
        },
        registrationHeader: {
            textAlign: 'center',
            fontSize: '21px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: textColor,

            [theme.breakpoints.down('sm')]: {
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

            [theme.breakpoints.down('sm')]: {
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
            [theme.breakpoints.down('sm')]: {
                '& span': {
                    maxHeight: 17,
                },
            },
        },
        goToHomepageLink: {
            fontFamily: theme.typography.fontFamily,
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
            // maxHeight: 600,
            // overflowY: 'scroll',
        },
        agreementHeader: {
            fontSize: 21,
            fontWeight: 'normal',
            margin: '12px 0 0 0',
        },
        agreementRequired: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
        },
        agreementRequiredAsterix: {
            color: theme.palette.secondary.main,
        },
        agreementMoreBtn: {
            color: mainColor,
            justifyContent: 'flex-start',
            fontSize: 16,
            paddingLeft: 0,
        },
        agreementCheckbox: {
            padding: 0,
            marginRight: theme.spacing(1),
        },
        agreementCheckboxHeader: {
            // margin: '10px 0 12px 0',
            fontSize: 21,
            fontWeight: 500,
        },
        agreementCheckboxWrapper: {
            // marginTop: 17,
            display: 'flex',
            flexDirection: 'column',

            '&.lastAgreement': {
                // margin: 0,
                // borderBottom: '1px solid #C4C4C4',
            },
        },
        checkboxContent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            // marginTop: '20px',
        },
        agreementText: {
            // margin: '0 0 7px 0',
            marginTop: theme.spacing(0.5),
        },
        agreementLink: {
            color: mainColor,
        },
        agreementModal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        agreementPanel: {
            margin: '0 0 10px 34px',
        },
        loginHeader: {},

        header: {
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(4),
            },
        },
        footer: {},
    }),
);
