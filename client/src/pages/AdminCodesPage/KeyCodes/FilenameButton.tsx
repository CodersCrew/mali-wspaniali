import { createStyles, Link, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import clsx from 'clsx';

import { ArrowTooltip } from '../../../components/Tooltip/ArrowTooltip';

interface Props {
    text: string;
    tooltip: string;
    primary?: boolean;
    onClick: () => void;
}

export function FilenameButton({ text, tooltip, onClick, primary }: Props) {
    const classes = useStyles();

    return (
        <ArrowTooltip title={tooltip}>
            <Link
                component="button"
                variant="caption"
                onClick={onClick}
                classes={{ root: clsx({ [classes.buttonWrapper]: true, [classes.highlight]: !!primary }) }}
            >
                <>
                    <SaveAltIcon className={classes.downloadIcon} />
                    <Typography variant="caption">{text}</Typography>
                </>
            </Link>
        </ArrowTooltip>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        downloadIcon: {
            color: theme.palette.success.main,
            fontSize: 18,
            marginRight: theme.spacing(1),
        },
        buttonWrapper: {
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                textDecorationColor: theme.palette.text.primary,
            },
        },
        highlight: {
            color: theme.palette.success.main,
            '&:hover': {
                textDecorationColor: theme.palette.success.main,
            },
        },
    }),
);
