import { User, Kindergarten } from '../../graphql/types';

export interface ChildModalProps {
    preventClose?: boolean;
    isCancelButtonVisible?: boolean;
    parent: User;
    kindergartens: Kindergarten[];
}

export type AddChildModalProps = Omit<ChildModalProps, 'parent'>;
