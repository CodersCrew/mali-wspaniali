import React, { FC } from 'react';
import { Button, ExtendButtonBase, ButtonTypeMap } from '@material-ui/core/';

type Props = ExtendButtonBase<ButtonTypeMap<{}, "button">>

export const ButtonElement: FC<Props>  = ({ children, ...props }) => {
    return <Button {...props}>{children}</Button>
}