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
            minWidth: 360,
            height: '100vh',
            overflowY: 'auto',
            padding: theme.spacing(0, 2),
            [theme.breakpoints.down('md')]: {
                justifyContent: 'start',
            },
        },
        form: {
            width: '100%',
        },
        headerContainer: {
            display: 'flex',
            marginBottom: '25px',
            justifyContent: 'center',
            alignItems: 'center',

            [theme.breakpoints.down('md')]: {
                marginTop: '40px',
                marginBottom: '5px',
            },
        },
        formItem: {
            margin: theme.spacing(2, 0),
            width: '100%',
        },
        stepper: {
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.down('md')]: {
                padding: 0,
            },
        },
        stepperContent: {
            [theme.breakpoints.down('md')]: {
                padding: 0,
                border: 0,
                marginLeft: 0,
            },
        },
        divider: {
            width: '100%',
            height: '1px',
            margin: theme.spacing(0.5, 0, 1.5),
        },
        registrationHeader: {
            textAlign: 'center',
            fontSize: '21px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: textColor,

            [theme.breakpoints.down('md')]: {
                '&.confirmation': {
                    marginTop: 0,
                },
            },
        },
        buttonWrapper: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: 33,
            margin: '20px 0',

            '&.emailContent': {
                justifyContent: 'flex-end',
            },

            [theme.breakpoints.down('md')]: {
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
            [theme.breakpoints.down('md')]: {
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
            fontSize: '14px',
            paddingLeft: 0,
        },
        agreementCheckbox: {
            padding: 0,
            marginRight: theme.spacing(1),
        },
        agreementCheckboxHeader: {
            fontSize: 21,
            fontWeight: 500,
        },
        agreementCheckboxWrapper: {
            display: 'flex',
            flexDirection: 'column',

            '&.lastAgreement': {},
        },
        checkboxContent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
        },
        agreementText: {
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
        agreementExtraContent: {
            backgroundColor: theme.palette.background.default,
        },

        loginHeader: {},

        header: {
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(5),
            },
        },
        subHeader: {
            textAlign: 'center',
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
        },
        topHeader: {
            width: '100%',
            height: 56,
            minHeight: 56,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            alignItems: 'center',
        },
        accordionSummary: {
            backgroundColor: theme.palette.background.default,
            border: 0,
        },
    }),
);
