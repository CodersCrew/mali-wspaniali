import { User, Kindergarten } from '../../graphql/types';

export interface EditChildModalProps {
    preventClose?: boolean;
    isCancelButtonVisible?: boolean;
    parent: User;
    kindergartens: Kindergarten[];
}

export type AddChildModalProps = Omit<EditChildModalProps, 'parent'>;
