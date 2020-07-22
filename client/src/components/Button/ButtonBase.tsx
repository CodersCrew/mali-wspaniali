import React, { FC } from 'react';
import { Button, ButtonProps, makeStyles, createStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export type CustomButtonProps = ButtonProps & {
    innerText?: string,
    // variant will be required in the final version
    // variant: string,
};

export const ButtonBase: FC<CustomButtonProps> = ({ innerText, className, children, ...props }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    let content
    if (children) {
        content = children;
    } else if (innerText) {
        content = t(innerText);
    } else {
        content = '';
    };

    return (
        <Button {...props} className={clsx(className, classes.button)} >
            {content}
        </Button>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            whiteSpace: 'nowrap',
            borderRadius: '4px',
        },
    }),
);
