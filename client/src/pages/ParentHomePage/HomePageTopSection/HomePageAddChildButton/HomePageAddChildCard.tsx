import { makeStyles, createStyles, Theme, Typography, Paper } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

type AddChildCardProps = {
    text: string;
    onClick: () => void;
};

export const HomePageAddChildCard = ({ text, onClick }: AddChildCardProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container} onClick={onClick}>
            <AddCircleIcon className={classes.icon} />
            <div>
                <Typography variant="subtitle2">{text}</Typography>
            </div>
        </Paper>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            padding: 12,

            '&:hover': {
                cursor: 'pointer',
                opacity: 0.8,
                boxShadow: '0 0 2px 0px #fff',
                transition: 'all 0.3s ease-in-out',
            },
        },
        icon: {
            color: theme.palette.text.secondary,
            width: '75px',
            height: '126px',
        },
    }),
);
