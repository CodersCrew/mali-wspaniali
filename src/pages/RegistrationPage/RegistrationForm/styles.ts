import { backgroundColor, secondaryColor } from '../../../colors';
import { makeStyles } from '@material-ui/core/';

export const useStyles = makeStyles({
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
        margin: '20px 0',
        width: '100%',
    },
    loginHeader: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '21px',
        fontWeight: 'bold',
        marginBottom: '25px',
        textTransform: 'uppercase',

        '@media (max-width:767px)': {
            marginTop: '40px',
        },
    },
    buttonWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '@media (max-width:767px)': {
            margin: '0 0 20px 0',
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
        color: '#fff',
        background: secondaryColor,
        textDecoration: 'none',
        borderRadius: '4px',
        padding: '4px 10px',
        marginTop: '50px',
    },
});
