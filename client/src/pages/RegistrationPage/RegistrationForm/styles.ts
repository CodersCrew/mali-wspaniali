import { makeStyles, createStyles, Theme } from '@material-ui/core/';

import { secondaryColor, mainColor, textColor, white } from '../../../colors';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minWidth: 360,
            height: '100%',
            overflowY: 'auto',
            padding: theme.spacing(0, 2),
            [theme.breakpoints.down('md')]: {
                justifyContent: 'flex-start',
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
            backgroundColor: theme.palette.grey[400],
            width: '100%',
            margin: theme.spacing(0.5, 0, 1.5),
            padding: 0,
            '& :nth-child(1)': {
                border: 0,
                minHeight: 0,
                height: '1px',
            },
        },
        dividerCompleted: {
            backgroundColor: theme.palette.primary.main,
            width: '100%',
            margin: theme.spacing(0.5, 0, 1.5),
            padding: 0,
            '& :nth-child(1)': {
                border: 0,
                minHeight: 0,
                height: '1px',
            },
        },
        stepConnectorCompleted: {
            '& :nth-child(1)': {
                borderLeftColor: theme.palette.primary.main,
            },
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
            padding: theme.spacing(0, 3),
            width: '75%',
            [theme.breakpoints.down('md')]: {
                width: 'auto',
            },
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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                padding: theme.spacing(0, 3),
            },
        },
        chip: {
            margin: '5px 0',
            border: 0,
            justifySelf: 'start',

            '&.checked': {
                color: theme.palette.primary,
            },

            [theme.breakpoints.down('sm')]: {
                margin: 0,
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
            justifyContent: 'flex-start',
        },
        agreementRequiredAsterisk: {
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
            justifyContent: 'flex-start',
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
            paddingLeft: 0,
            paddingRight: 0,
        },

        loginHeader: {},

        header: {
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(5),
            },
        },
        subHeader: {
            width: 200,
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
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        accordionSummary: {
            backgroundColor: theme.palette.background.default,
            border: 0,
        },
        backToLoginButton: {
            textAlign: 'center',
            whiteSpace: 'normal',
            fontSize: theme.typography.caption.fontSize,
        },
    }),
);
