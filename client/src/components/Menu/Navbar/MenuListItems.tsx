import React from 'react';
import { Avatar, MenuList, Paper, makeStyles, Theme, createStyles, ClickAwayListener } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { Child } from '../../../firebase/types';
import { MenuListItem, MenuLogoutItem } from './MenuItem';
import BoyAvatar from '../../../assets/boy.png';
import GirlAvatar from '../../../assets/girl.png';
import { getMenuItems } from '../menuItems';

export type MenuListItemsProps = {
    childrenData: Child[];
    userRole: string;
    handleClose: () => void;
};

export const MenuListItems = ({ userRole, childrenData, handleClose }: MenuListItemsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const staticMenuItems = getMenuItems(t, userRole);

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Paper className={classes.menuList}>
                <MenuList dense={true}>
                    {userRole === 'parent' &&
                        childrenData.map(child => {
                            const { firstName, id, sex } = child;
                            const iconComponent = (
                                <Avatar
                                    className={classes.listItemAvatar}
                                    src={sex === 'male' ? BoyAvatar : GirlAvatar}
                                    variant="square"
                                />
                            );
                            const link = `/parent/child/${id}`;
                            return (
                                <MenuListItem
                                    key={firstName}
                                    link={link}
                                    text={firstName}
                                    iconComponent={iconComponent}
                                    handleClose={handleClose}
                                />
                            );
                        })}
                    {staticMenuItems.slice(1).map(staticItem => {
                        const { name, link, icon } = staticItem;
                        return (
                            <MenuListItem
                                key={name}
                                link={link}
                                text={name}
                                iconComponent={icon}
                                handleClose={handleClose}
                            />
                        );
                    })}
                    <MenuLogoutItem />
                </MenuList>
            </Paper>
        </ClickAwayListener>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuList: {
            position: 'absolute',
            zIndex: 10,
            right: '40px',
            marginTop: '10px',

            [theme.breakpoints.down('sm')]: {
                right: '10px',
                top: '45px',
                position: 'fixed',
            },
        },
        listItemAvatar: {
            width: '24px',
            height: '24px',
            '&> img': {
                objectFit: 'contain',
            },
        },
    }),
);
