import React from 'react';
import { TFunction } from 'i18next';
import { makeStyles, Avatar } from '@material-ui/core/';
import {
    Assessment,
    Notes,
    Home,
    LibraryBooks,
    Eco,
    SportsBasketball,
    Notifications,
    Build,
    PowerSettingsNew,
    Face,
    StarBorder,
    Fingerprint,
    ThumbUp,
    AssignmentTurnedIn,
} from '@material-ui/icons';
import { Child, Sex } from '../../../graphql/types';
import { SingleItemProps } from './SingleItem';
import BoyAvatar from '../../../assets/boy.png';
import GirlAvatar from '../../../assets/girl.png';

interface ChildMenuItemFactoryProps {
    child: Child;
    t: TFunction;
    active: string[];
}

interface MenuItemFactoryResult {
    mainItem: SingleItemProps;
    subItems: SingleItemProps[];
}

export function childMenuItemFactory({ child, active, t }: ChildMenuItemFactoryProps): MenuItemFactoryResult {
    const mainItemAvatar = <ChildAvatar sex={child.sex} />;

    const mainItem = {
        icon: mainItemAvatar,
        name: child.firstname,
        active: active.includes(child.firstname),
    };

    const subItems: SingleItemProps[] = [
        {
            icon: <Icon icon={<Assessment />} />,
            name: t('child-profile.results-list'),
            link: `/parent/child/${child._id}/results`,
            active: active.includes(`/parent/child/${child._id}/results`),
        },
        {
            icon: <Icon icon={<ThumbUp />} />,
            name: t('child-profile.recomendations'),
            link: `/parent/child/${child._id}/results`,
        },
        {
            icon: <Icon icon={<Notes />} />,
            name: t('child-profile.tests-information'),
            link: `/parent/tests-information`,
        },
        {
            icon: <Icon icon={<Fingerprint />} />,
            name: t('child-profile.child-details'),
            link: `/parent/${child._id}/details`,
        },
    ];

    return { mainItem, subItems };
}

interface BlogMenuItemFactoryProps {
    t: TFunction;
    active: string[];
}

export function blogMenuItemFactory({ active, t }: BlogMenuItemFactoryProps): MenuItemFactoryResult {
    const mainItemAvatar = <Icon icon={<LibraryBooks />} />;

    const mainItem = {
        icon: mainItemAvatar,
        name: t('menu.news'),
        link: '/parent/blog/all/1',
        active: active.includes('menu.news'),
    };

    const subItems: SingleItemProps[] = [
        {
            icon: <Icon icon={<Eco />} />,
            name: t('blog-categories.all'),
            link: `/parent/blog/all/1`,
            active: active.includes('blog-categories.all'),
        },
        {
            icon: <Icon icon={<Eco />} />,
            name: t('blog-categories.food'),
            link: `/parent/blog/food/1`,
            active: active.includes('blog-categories.food'),
        },
        {
            icon: <Icon icon={<SportsBasketball />} />,
            name: t('blog-categories.activity'),
            link: `/parent/blog/activity/1`,
            active: active.includes('blog-categories.activity'),
        },
        {
            icon: <Icon icon={<Face />} />,
            name: t('blog-categories.emotions'),
            link: `/parent/blog/emotions/1`,
            active: active.includes('blog-categories.emotions'),
        },
        {
            icon: <Icon icon={<StarBorder />} />,
            name: t('blog-categories.other'),
            link: `/parent/blog/other/1`,
            active: active.includes('blog-categories.other'),
        },
    ];

    return { mainItem, subItems };
}

interface MenuItemFactoryProps {
    name: string;
    t: TFunction;
    active: string[];
    rightIcon?: JSX.Element;
}

export function menuItemFactory({ name, rightIcon, active, t }: MenuItemFactoryProps): SingleItemProps {
    const MainPage = {
        name: 'menu.home',
        link: '/parent',
        icon: <Icon icon={<Home />} />,
    };

    const NotificationsPage = {
        name: 'menu.notifications',
        link: '/parent/notifications',
        icon: <Icon icon={<Notifications />} />,
        rightIcon,
    };

    const SettingsPage = {
        name: 'menu.settings',
        link: '/parent/settings',
        icon: <Icon icon={<Build />} />,
    };

    const LogoutPage = {
        name: 'menu.logout',
        link: 'logout',
        icon: <Icon icon={<PowerSettingsNew />} />,
    };

    const AgreementsPage = {
        name: 'menu.agreements',
        link: '/parent/agreements',
        icon: <Icon icon={<AssignmentTurnedIn />} />,
    };

    const options: { [index: string]: SingleItemProps } = {
        'main-page': MainPage,
        notifications: NotificationsPage,
        settings: SettingsPage,
        logout: LogoutPage,
        agreements: AgreementsPage,
    };

    const item = options[name];

    if (active.includes(item.name)) item.active = true;

    item.name = t(item.name);

    return item;
}

export function adminMenuItemFactory({ name, rightIcon, active, t }: MenuItemFactoryProps): SingleItemProps {
    const MainPage = {
        name: 'menu.home',
        link: '/admin',
        icon: <Icon icon={<Home />} />,
    };

    const ResultsPage = {
        name: 'child-profile.results-list',
        link: '/admin/tests',
        icon: <Icon icon={<Assessment />} />,
        rightIcon,
    };

    const NotificationsPage = {
        name: 'menu.notifications',
        link: '/admin/notifications',
        icon: <Icon icon={<Notifications />} />,
        rightIcon,
    };

    const SettingsPage = {
        name: 'menu.settings',
        link: '/parent/settings',
        icon: <Icon icon={<Build />} />,
    };

    const LogoutPage = {
        name: 'menu.logout',
        link: 'logout',
        icon: <Icon icon={<PowerSettingsNew />} />,
    };

    const AgreementsPage = {
        name: 'menu.agreements',
        link: '/parent/agreements',
        icon: <Icon icon={<AssignmentTurnedIn />} />,
    };

    const options: { [index: string]: SingleItemProps } = {
        'main-page': MainPage,
        notifications: NotificationsPage,
        settings: SettingsPage,
        logout: LogoutPage,
        agreements: AgreementsPage,
        results: ResultsPage,
    };

    const item = options[name];

    if (active.includes(item.name)) item.active = true;

    item.name = t(item.name);

    return item;
}

function ChildAvatar({ sex }: { sex: Sex }) {
    const classes = useStyles();

    return (
        <div className={classes.avatarWrapper}>
            <Avatar src={sex === 'male' ? BoyAvatar : GirlAvatar} className={classes.avatar} variant="square" />
        </div>
    );
}

function Icon({ icon }: { icon: JSX.Element }) {
    const classes = useStyles();

    return <div className={classes.avatarWrapper}>{icon}</div>;
}

const useStyles = makeStyles({
    avatarWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        width: 28,
        height: 28,
    },
    avatar: {
        width: 24,
        height: 24,
        '&> img': {
            objectFit: 'contain',
        },
    },
});
