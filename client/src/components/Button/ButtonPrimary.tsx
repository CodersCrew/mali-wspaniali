import { ButtonBase, CustomButtonProps } from './ButtonBase';

export const ButtonPrimary: React.FC<CustomButtonProps> = (props) => {
    return <ButtonBase {...props} color="primary" />;
};
