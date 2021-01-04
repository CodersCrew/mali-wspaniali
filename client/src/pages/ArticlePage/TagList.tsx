import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

import { ButtonPrimary } from '../../components/Button';
import { useIsDevice } from '../../queries/useBreakpoints';

interface Props {
    tags: string[];
}

export function TagList({ tags }: Props) {
    const classes = useStyles();
    const { isMobile } = useIsDevice();

    return (
        <>
            {tags.map((tag, index) => {
                return (
                    <ButtonPrimary
                        key={`${tag} ${index}`}
                        variant="contained"
                        disableElevation
                        className={clsx({
                            [classes.contentTagsButton]: true,
                            [classes.contentTagsButtonMobile]: isMobile,
                        })}
                        innerText={`#${tag}`}
                        color="primary"
                    />
                );
            })}
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentTagsButton: {
            color: theme.palette.text.primary,
            borderRadius: theme.spacing(2),
            margin: theme.spacing(0, 2, 0, 0),
        },
        contentTagsButtonMobile: {
            margin: theme.spacing(2, 2, 0, 0),
        },
    }),
);
