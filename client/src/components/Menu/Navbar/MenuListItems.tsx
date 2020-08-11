import React from 'react';
import { Avatar, MenuList, Paper, makeStyles, Theme, createStyles, ClickAwayListener } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { MenuListItem, MenuLogoutItem } from './MenuItem';
import BoyAvatar from '../../../assets/boy.png';
import GirlAvatar from '../../../assets/girl.png';
import { getMenuItems } from '../menuItems';
import { Child, Role } from '../../../graphql/types';

export type MenuListItemsProps = {
    children: Child[];
    role: Role;
    handleClose: () => void;
};

export const MenuListItems = ({ role, children, handleClose }: MenuListItemsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const staticMenuItems = getMenuItems(t, role);

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Paper className={classes.menuList}>
                <MenuList dense={true}>
                    {role === 'parent' &&
                        children.map(child => {
                            const { firstname, _id, sex } = child;
                            const iconComponent = (
                                <Avatar
                                    className={classes.listItemAvatar}
                                    src={sex === 'male' ? BoyAvatar : GirlAvatar}
                                    variant="square"
                                />
                            );
                            const link = `/parent/child/${_id}`;

                            return (
                                <MenuListItem
                                    key={firstname}
                                    link={link}
                                    text={firstname}
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
