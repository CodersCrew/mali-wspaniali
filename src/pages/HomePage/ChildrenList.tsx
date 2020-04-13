import React from 'react';
import { makeStyles } from '@material-ui/core/';
// import { useTranslation } from 'react-i18next';

export interface Child {
    name: string,
    profilePic:string
}
export const ChildrenList = (props:{ maliChildren : Child[]}) =>
{
    const classes = useStyles();
    // const { t } = useTranslation();
    return (
        <>
            { props.maliChildren.map((child: Child) => {
                return (
                    <div key={ child.name } className = {classes.ChildrenAva}>
                        <p >{ child.name }</p>
                    </div>
                );
            }) }
        </>
    );
};

const useStyles = makeStyles({
    ChildrenAva: {
        borderRadius: '8px',
    },
});