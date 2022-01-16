import { User, Kindergarten } from '@app/graphql/types';

export interface ChildModalProps {
    preventClose?: boolean;
    isCancelButtonVisible?: boolean;
    user: User;
    kindergartens: Kindergarten[];
}

export type AddChildModalProps = Omit<ChildModalProps, 'user'>;
