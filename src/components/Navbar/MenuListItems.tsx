import React from 'react';
import { Avatar, MenuList, Paper, makeStyles, Theme, createStyles } from '@material-ui/core/';
import { FormatListBulleted, Build, Assessment, AssignmentTurnedIn, Message, Archive } from '@material-ui/icons/';
import { useTranslation } from 'react-i18next';
import { Child } from '../../firebase/types';
import { MenuListItem, MenuLogoutItem } from './MenuItem';
import BoyAvatar from '../../assets/boy.png';
import GirlAvatar from '../../assets/girl.png';

export type MenuListItemsProps = {
    childrenData: Child[];
    userRole: string;
};

export const MenuListItems = ({ userRole, childrenData }: MenuListItemsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const parentStaticMenuItems = [
        { name: t('navbar.news'), link: '/parent/blog', icon: <FormatListBulleted /> },
        { name: t('navbar.settings'), link: '/parent/settings', icon: <Build /> },
    ];

    const adminStaticMenuItems = [
        { name: t('navbar.results'), link: '/admin/tests', icon: <Assessment /> },
        { name: t('navbar.agreements'), link: '/admin/agreements', icon: <AssignmentTurnedIn /> },
        { name: t('navbar.newsletter'), link: '/admin/newsletter', icon: <Message /> },
        { name: t('navbar.newsletter-archive'), link: '/admin/newsletter', icon: <Archive /> },
        { name: t('navbar.blog'), link: '/admin/blog', icon: <FormatListBulleted /> },
        { name: t('navbar.settings'), link: '/admin/settings', icon: <Build /> },
    ];

    const staticMenuItems = userRole === 'parent' ? parentStaticMenuItems : adminStaticMenuItems;

    return (
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
                        const link = `parent/child/${id}`;
                        return (
                            <MenuListItem key={firstName} link={link} text={firstName} iconComponent={iconComponent} />
                        );
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
