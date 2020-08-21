import React, { FC } from 'react';
import { ButtonBase, CustomButtonProps } from './ButtonBase';

export const ButtonSecondary: FC<CustomButtonProps> = props => {
    return <ButtonBase {...props} color="secondary" />;
};
