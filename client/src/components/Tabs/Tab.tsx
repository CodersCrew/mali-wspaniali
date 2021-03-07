import { Tab as MuiTab, makeStyles, createStyles, Theme, TabProps } from '@material-ui/core/';

import { useIsDevice } from '../../queries/useBreakpoints';

export const Tab = (props: TabProps) => {
    const { isMobile } = useIsDevice();
    const classes = useStyles({ isMobile });

    return <MuiTab classes={classes} {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '0',
            height: '45px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: theme.palette.text.secondary,
            textTransform: 'uppercase',
            fontWeight: theme.typography.button.fontWeight,
            padding: 0,
            minWidth: 'fit-content',
        },
        wrapper: {
            margin: '12px',
        },
        selected: {
            color: (props: { isMobile: boolean }) => (props.isMobile ? '#212121' : theme.palette.secondary.light),
        },
    }),
);
