import React, {FC} from 'react';
import { ButtonBase, CustomButtonProps } from './ButtonBase';

export const ButtonDefault: FC<CustomButtonProps>  = (props) => {

    return (
        <ButtonBase {...props} />
    );
};