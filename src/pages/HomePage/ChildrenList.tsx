import React from 'react';
import { makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

export interface Child {
    name: string,
    profilePic:string
}
export const ChildrenList: React.FC<Array<Child>> = ({ children }) =>
{
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        children.map((child, name) => { return (<p key={ name }>{ name }</p>); })
    );
};

const useStyles = makeStyles({
    ChildrenAva: {
        borderRadius: '8px',
    },
});