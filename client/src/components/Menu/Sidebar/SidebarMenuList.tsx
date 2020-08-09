import React from 'react';
import { makeStyles, Avatar, MenuList } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { getMenuItems } from '../menuItems';
import { SidebarMenuItem } from './SidebarMenuItem';
import { cardBackgroundColor } from '../../../colors';
import BoyAvatar from '../../../assets/boy.png';
import GirlAvatar from '../../../assets/girl.png';
import { Me } from '../../../graphql/types';

interface Props {
    user: Me;
    extended: boolean;
}

export const SidebarMenuList = ({ extended, user }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { children } = user;

    const menuItems = getMenuItems(t, user.role);

    const renderMenuItems = () => {
        if (children.length === 0) {
            return menuItems.map(({ name, link, icon }) => (
                <SidebarMenuItem key={name} extended={extended} name={name} link={link} icon={icon} />
            ));
        }

        return children.map(({ firstname, _id, sex }) => {
            const iconComponent = (
                <div className={classes.avatarWrapper}>
                    <Avatar src={sex === 'male' ? BoyAvatar : GirlAvatar} className={classes.avatar} variant="square" />
                </div>
            );

            const link = `/parent/child/${_id}`;

            menuItems.splice(1, 0, { name: firstname, link, icon: iconComponent });

            return menuItems.map(({ name, link: itemLink, icon }) => (
                <SidebarMenuItem key={name} extended={extended} name={name} link={itemLink} icon={icon} />
            ));
        });
    };

    return <MenuList>{renderMenuItems()}</MenuList>;
};

const useStyles = makeStyles({
    avatarWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        width: 28,
        height: 28,
        cardBackgroundColor,
    },
    avatar: {
        width: 24,
        height: 24,
        '&> img': {
            objectFit: 'contain',
        },
    },
});
