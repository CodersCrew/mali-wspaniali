import React from 'react';
import { ButtonBase, CustomButtonProps } from './ButtonBase';

export const ButtonDefault: React.FC<CustomButtonProps> = (props) => {
    return <ButtonBase {...props} />;
};
