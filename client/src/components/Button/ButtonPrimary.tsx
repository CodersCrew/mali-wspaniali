import React, { FC } from 'react';
import { ButtonBase, CustomButtonProps } from './ButtonBase';

export const ButtonPrimary: FC<CustomButtonProps> = (props) => {
    return <ButtonBase {...props} color="primary" />;
};
