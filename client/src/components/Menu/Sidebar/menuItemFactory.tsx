import React from 'react';
import { TFunction } from 'i18next';
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
    ViewModule,
    Archive,
    Message,
    AccessAlarm,
    Ballot,
    DynamicFeed,
    Email,
    PeopleAlt,
    PersonAdd,
    Security,
} from '@material-ui/icons';

import { Child } from '../../../graphql/types';
import { SingleItemProps } from './SingleItem';
import { ChildAvatar, Icon } from './Icon';

interface ChildMenuItemFactoryProps {
    child: Child;
    t: TFunction;
    active: string[];
}

interface MenuItemFactoryResult {
    mainItem: SingleItemProps;
    subItems: SingleItemProps[];
}

interface MenuItemFactoryProps {
    name: string;
    t: TFunction;
    active: string[];
    rightIcon?: JSX.Element;
}

interface CollapsibleMenuItemFactoryProps {
    t: TFunction;
    active: string[];
}

type CollapsibleItem = { mainItem: SingleItemProps; subItems: SingleItemProps[] };

interface ItemFactory {
    create: (options: Pick<MenuItemFactoryProps, 'name' | 'rightIcon'>) => SingleItemProps;
}

interface CollapsibleItemFactory<T> {
    create: (options: T) => CollapsibleItem;
}

export function getParentMenuItemFactory({ active, t }: Pick<MenuItemFactoryProps, 'active' | 't'>): ItemFactory {
    return {
        create: ({ name, rightIcon }: Pick<MenuItemFactoryProps, 'name' | 'rightIcon'>) =>
            getParentMenuItem({ active, t, name, rightIcon }),
    };
}

export function getAdminMenuItemFactory({ active, t }: Pick<MenuItemFactoryProps, 'active' | 't'>): ItemFactory {
    return {
        create: ({ name, rightIcon }: Pick<MenuItemFactoryProps, 'name' | 'rightIcon'>) =>
            getAdminMenuItem({ active, t, name, rightIcon }),
    };
}

export function getInstructorMenuItemFactory({ active, t }: Pick<MenuItemFactoryProps, 'active' | 't'>): ItemFactory {
    return {
        create: ({ name, rightIcon }: Pick<MenuItemFactoryProps, 'name' | 'rightIcon'>) =>
            getInstructorMenuItem({ active, t, name, rightIcon }),
    };
}

export function getChildMenuItemFactory({
    active,
    t,
}: Pick<MenuItemFactoryProps, 'active' | 't'>): CollapsibleItemFactory<Pick<ChildMenuItemFactoryProps, 'child'>> {
    return { create: ({ child }) => getChildMenuItem({ active, t, child }) };
}

export function getBlogMenuItemFactory({
    active,
    t,
}: Pick<MenuItemFactoryProps, 'active' | 't'>): CollapsibleItemFactory<{}> {
    return {
        create: () => getBlogMenuItem({ active, t }),
    };
}

export function getResultsMenuItemFactory({
    active,
    t,
}: Pick<MenuItemFactoryProps, 'active' | 't'>): CollapsibleItemFactory<{}> {
    return {
        create: () => getResultsMenuItem({ active, t }),
    };
}

export function getNewsletterMenuItemFactory({
    active,
    t,
}: Pick<MenuItemFactoryProps, 'active' | 't'>): CollapsibleItemFactory<{}> {
    return {
        create: () => getNewsletterMenuItem({ active, t }),
    };
}

export function getAccessMenuItemFactory({
    active,
    t,
}: Pick<MenuItemFactoryProps, 'active' | 't'>): CollapsibleItemFactory<{}> {
    return {
        create: () => getAccessMenuItem({ active, t }),
    };
}

function getChildMenuItem({ child, active, t }: ChildMenuItemFactoryProps): MenuItemFactoryResult {
    const mainItemAvatar = <ChildAvatar sex={child.sex} />;

    const mainItem = {
        icon: mainItemAvatar,
        name: child.firstname,
        active: active.includes(child.firstname),
    };

    const subItems: SingleItemProps[] = [
        {
            icon: <Icon icon={<Assessment />} />,
            name: t('parent-menu.child.results'),
            link: `/parent/child/${child._id}/results`,
            active: active.includes(`/parent/child/${child._id}/results`),
        },
        {
            icon: <Icon icon={<ThumbUp />} />,
            name: t('parent-menu.child.recommendations'),
            link: `/parent/child/${child._id}/recommendations`,
            active: active.includes(`/parent/child/${child._id}/recommendations`),
        },
        {
            icon: <Icon icon={<Notes />} />,
            name: t('parent-menu.child.tests-information'),
            link: `/parent/child/${child._id}/tests-information`,
            active: active.includes(`/parent/child/${child._id}/tests-information`),
        },
        {
            icon: <Icon icon={<Fingerprint />} />,
            name: t('parent-menu.child.details'),
            link: `/parent/child/${child._id}/details`,
            active: active.includes(`/parent/child/${child._id}/details`),
        },
    ];

    return { mainItem, subItems };
}

function getBlogMenuItem({ active, t }: CollapsibleMenuItemFactoryProps): MenuItemFactoryResult {
    const mainItem = {
        icon: <Icon icon={<LibraryBooks />} />,
        name: t('parent-menu.blog'),
        link: '/parent/blog/all',
        active: active.includes('parent-menu.blog'),
    };

    const subItems: SingleItemProps[] = [
        {
            icon: <Icon icon={<ViewModule />} />,
            name: t('blog-categories.all'),
            link: '/parent/blog/all',
            active: active.includes('blog-categories.all'),
        },
        {
            icon: <Icon icon={<Eco />} />,
            name: t('blog-categories.food'),
            link: '/parent/blog/food',
            active: active.includes('blog-categories.food'),
        },
        {
            icon: <Icon icon={<SportsBasketball />} />,
            name: t('blog-categories.activity'),
            link: '/parent/blog/activity',
            active: active.includes('blog-categories.activity'),
        },
        {
            icon: <Icon icon={<Face />} />,
            name: t('blog-categories.emotions'),
            link: '/parent/blog/emotions',
            active: active.includes('blog-categories.emotions'),
        },
        {
            icon: <Icon icon={<StarBorder />} />,
            name: t('blog-categories.other'),
            link: '/parent/blog/other',
            active: active.includes('blog-categories.other'),
        },
    ];

    return { mainItem, subItems };
}

function getParentMenuItem({ name, rightIcon, active, t }: MenuItemFactoryProps): SingleItemProps {
    const MainPageItem = {
        name: 'parent-menu.home',
        link: '/parent',
        icon: <Icon icon={<Home />} />,
    };

    const NotificationsItem = {
        name: 'parent-menu.notifications',
        link: '/parent/notifications',
        icon: <Icon icon={<Notifications />} />,
        rightIcon,
    };

    const SettingsItem = {
        name: 'parent-menu.settings',
        link: '/parent/settings',
        icon: <Icon icon={<Build />} />,
    };

    const LogoutItem = {
        name: 'parent-menu.logout',
        link: 'logout',
        icon: <Icon icon={<PowerSettingsNew />} />,
    };

    const AgreementsItem = {
        name: 'parent-menu.agreements',
        link: '/parent/agreements',
        icon: <Icon icon={<AssignmentTurnedIn />} />,
    };

    const options: { [index: string]: SingleItemProps } = {
        'main-page': MainPageItem,
        notifications: NotificationsItem,
        settings: SettingsItem,
        logout: LogoutItem,
        agreements: AgreementsItem,
    };

    const item = options[name];

    if (active.includes(item.name)) item.active = true;

    item.name = t(item.name);

    return item;
}

function getResultsMenuItem({ active, t }: CollapsibleMenuItemFactoryProps): MenuItemFactoryResult {
    const mainItem = {
        icon: <Icon icon={<Assessment />} />,
        name: t('admin-menu.results.title'),
        link: '/admin/tests',
        active: active.includes('admin-menu.results.title'),
    };

    const subItems: SingleItemProps[] = [
        {
            icon: <Icon icon={<Ballot />} />,
            name: t('admin-menu.results.table'),
            link: '/admin/tests',
            active: active.includes('admin-menu.results.table'),
        },
        {
            icon: <Icon icon={<DynamicFeed />} />,
            name: t('admin-menu.results.advice-and-recommendations'),
            link: '/admin/recommendations',
            active: active.includes('admin-menu.results.advice-and-recommendations'),
        },
    ];

    return { mainItem, subItems };
}

function getNewsletterMenuItem({ active, t }: CollapsibleMenuItemFactoryProps): MenuItemFactoryResult {
    const mainItem = {
        icon: <Icon icon={<Message />} />,
        name: t('admin-menu.newsletter.title'),
        link: '/admin/newsletter',
        active: active.includes('admin-menu.newsletter.title'),
    };

    const subItems: SingleItemProps[] = [
        {
            icon: <Icon icon={<Email />} />,
            name: t('admin-menu.newsletter.new-message'),
            link: '/admin/newsletter',
            active: active.includes('admin-menu.newsletter.new-message'),
        },
        {
            icon: <Icon icon={<Archive />} />,
            name: t('admin-menu.newsletter.archive'),
            link: '/admin/archive',
            active: active.includes('admin-menu.newsletter.archive'),
        },
    ];

    return { mainItem, subItems };
}

function getAccessMenuItem({ active, t }: CollapsibleMenuItemFactoryProps): MenuItemFactoryResult {
    const mainItem = {
        icon: <Icon icon={<PeopleAlt />} />,
        name: t('admin-menu.access.title'),
        link: '/admin/instructors',
        active: active.includes('admin-menu.access.title'),
    };

    const subItems: SingleItemProps[] = [
        {
            icon: <Icon icon={<PersonAdd />} />,
            name: t('admin-menu.access.instructors'),
            link: '/admin/instructors',
            active: active.includes('admin-menu.access.instructors'),
        },
        {
            icon: <Icon icon={<Security />} />,
            name: t('admin-menu.access.keycodes'),
            link: '/admin/keycodes',
            active: active.includes('admin-menu.access.keycodes'),
        },
    ];

    return { mainItem, subItems };
}

function getAdminMenuItem({ name, rightIcon, active, t }: MenuItemFactoryProps): SingleItemProps {
    const MainPageItem = {
        name: 'admin-menu.home',
        link: '/admin',
        icon: <Icon icon={<Home />} />,
    };

    const ResultsItem = {
        name: 'admin-menu.results',
        link: '/admin/tests',
        icon: <Icon icon={<Assessment />} />,
        rightIcon,
    };

    const NotificationsItem = {
        name: 'admin-menu.notifications',
        link: '/admin/notifications',
        icon: <Icon icon={<Notifications />} />,
        rightIcon,
    };

    const CreateBlogArticleItem = {
        name: 'admin-menu.create-blog-article',
        link: '/admin/article/create',
        icon: <Icon icon={<LibraryBooks />} />,
    };

    const SettingsItem = {
        name: 'admin-menu.settings',
        link: '/admin/settings',
        icon: <Icon icon={<Build />} />,
    };

    const LogoutItem = {
        name: 'admin-menu.logout',
        link: 'logout',
        icon: <Icon icon={<PowerSettingsNew />} />,
    };

    const AgreementsItem = {
        name: 'admin-menu.agreements',
        link: '/admin/agreements',
        icon: <Icon icon={<AssignmentTurnedIn />} />,
    };

    const ArchiveItem = {
        name: 'admin-menu.archive',
        link: '/admin/archive',
        icon: <Icon icon={<Archive />} />,
    };

    const NewsletterItem = {
        name: 'admin-menu.newsletter',
        link: '/admin/newsletter',
        icon: <Icon icon={<Message />} />,
    };

    const TestItem = {
        name: 'admin-menu.test-management',
        link: '/admin/test-management',
        icon: <Icon icon={<AccessAlarm />} />,
    };

    const options: { [index: string]: SingleItemProps } = {
        'main-page': MainPageItem,
        notifications: NotificationsItem,
        settings: SettingsItem,
        'create-blog-article': CreateBlogArticleItem,
        archive: ArchiveItem,
        newsletter: NewsletterItem,
        tests: TestItem,
        logout: LogoutItem,
        agreements: AgreementsItem,
        results: ResultsItem,
    };

    const item = options[name];

    if (active.includes(item.name)) item.active = true;

    item.name = t(item.name);

    return item;
}

function getInstructorMenuItem({ name, active, t }: MenuItemFactoryProps): SingleItemProps {
    const AddResultsItem = {
        name: 'instructor-menu.add-results',
        link: '/instructor',
        icon: <Icon icon={<Assessment />} />,
    };

    const SettingsItem = {
        name: 'instructor-menu.settings',
        link: '/instructor/settings',
        icon: <Icon icon={<Build />} />,
    };

    const LogoutItem = {
        name: 'instructor-menu.logout',
        link: 'logout',
        icon: <Icon icon={<PowerSettingsNew />} />,
    };

    const options: { [index: string]: SingleItemProps } = {
        'add-results': AddResultsItem,
        settings: SettingsItem,
        logout: LogoutItem,
    };

    const item = options[name];

    if (active.includes(item.name)) item.active = true;

    item.name = t(item.name);

    return item;
}
