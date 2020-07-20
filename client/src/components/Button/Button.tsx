import React, { FC } from 'react';
import { Button, ButtonProps, makeStyles, createStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../theme/types';
import clsx from 'clsx';

type Props = ButtonProps & {
    innerText?: string;
};

export const ButtonComponent: FC<Props> = ({ innerText, className, children, color, variant, ...props }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const buttonColor = color || "secondary"
    const buttonVariant = variant || "contained"

    let content
    if (children) {
        content = children;
    } else if (innerText) {
        content = t(innerText);
    } else {
        content = '';
    };

    return (
        <Button {...props} className={clsx(className, classes.button)} color={buttonColor} variant={buttonVariant} >
            {content}
        </Button>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            whiteSpace: 'nowrap',
            borderRadius: '4px',
        },
    }),
);
