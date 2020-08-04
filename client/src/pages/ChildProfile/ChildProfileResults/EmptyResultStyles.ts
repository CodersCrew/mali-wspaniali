import { makeStyles } from '@material-ui/styles';
import { secondaryColor, textColor } from '../../../colors';

export const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px',
    },
    titleWrapper: {
        marginBottom: '20px',
    },
    title: {
        fontWeight: 'normal',
        color: textColor,
    },
    content: {
        color: textColor,
    },
    image: {
        marginTop: '40px',
    },
    link: {
        color: secondaryColor,
        cursor: 'pointer',
    },
    list: {
        width: '60%',
    },
});
