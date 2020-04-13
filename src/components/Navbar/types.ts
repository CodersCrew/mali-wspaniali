import { Child } from '../../firebase/types';

export type MenuListItemsProps = {
    childrenData: Child[];
};

export type ChildMenuItem = {
    name: string,
    link: string,
    avatar: string,
}

export type StaticMenuItem = {
    name: string,
    link: string,
    icon: JSX.Element
}