import React from 'react';
import { ButtonBase, CustomButtonProps } from './ButtonBase';

export const ButtonSecondary: React.FC<CustomButtonProps> = (props) => {
    return <ButtonBase {...props} color="secondary" />;
};
