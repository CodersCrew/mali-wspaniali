import React from 'react';
import { Avatar, MenuList, Paper, makeStyles } from '@material-ui/core/';
import { FormatListBulleted, QuestionAnswer, Build } from '@material-ui/icons/';
import { useTranslation } from 'react-i18next';
import { Child } from '../../firebase/types';
import { MenuListItem, MenuLogoutItem } from './MenuItem';
import BoyAvatar from '../../assets/boy.png';
import GirlAvatar from '../../assets/girl.png';

export type MenuListItemsProps = {
    childrenData: Child[];
};

export const MenuListItems = (props: MenuListItemsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { childrenData } = props;

    const staticMenuItems = [
        { name: t('navbar.news'), link: '/parent/blog', icon: <FormatListBulleted /> },
        { name: t('navbar.messages'), link: '/', icon: <QuestionAnswer /> },
        { name: t('navbar.settings'), link: '/', icon: <Build /> },
    ];

    return (
        <Paper className={classes.menuList}>
            <MenuList>
                {childrenData.map(child => {
                    const { firstName, id, sex } = child;
                    const iconComponent = (
                        <Avatar
                            className={classes.listItemAvatar}
                            src={sex === 'male' ? BoyAvatar : GirlAvatar}
                            variant="square"
                        />
                    );
                    const link = `parent/child/${id}`;
                    return <MenuListItem key={firstName} link={link} text={firstName} iconComponent={iconComponent} />;
                })}
                {staticMenuItems.map(staticItem => {
                    const { name, link, icon } = staticItem;
                    return <MenuListItem key={name} link={link} text={name} iconComponent={icon} />;
                })}
                <MenuLogoutItem />
            </MenuList>
        </Paper>
    );
};

const useStyles = makeStyles({
    menuList: {
        position: 'absolute',
        zIndex: 10,
        right: '40px',
        marginTop: '10px',
    },
    listItemAvatar: {
        width: '24px',
        height: '24px',
        '&> img': {
            objectFit: 'contain',
        },
    },
});
