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
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '144px',
            padding: theme.spacing(1.5),

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
            height: '120px',
            marginBottom: theme.spacing(3.5),

            [theme.breakpoints.down('md')]: {
                marginBottom: theme.spacing(0.5),
            },
        },
    }),
);
