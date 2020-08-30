import React from 'react';
import { makeStyles, createStyles, List, Grid } from '@material-ui/core';
import { Me } from '../../../graphql/types';
import { getAdminMenuItemFactory } from './menuItemFactory';
import { useTranslation } from 'react-i18next';
import { SingleItem } from './SingleItem';
import { SecondaryLabel } from '../../Label';
import { MenuDrawer } from './MenuDrawer';
import { useBreakpoints } from '../../../queries/useBreakpoints';
import { getMenuWidth } from './getMenuWidth';
import { LabeledHeader } from './LabeledHeader';

export interface Props {
    user: Me | null;
    onClick: (link?: string) => void;
    onClose: () => void;
    active: string[];
    open: boolean;
}

export const AdminSidebar = ({
    onClick,
    onClose,
    user,
    active,
    open,
}: Props) => {
    const { t } = useTranslation();
    const device = useBreakpoints();
    const [, innerMargin] = getMenuWidth(device);

    const classes = useStyles({ width: innerMargin });
    if (!user) return null;

    const notificationsCount = user.notifications.length;

    const ItemFactory = getAdminMenuItemFactory({ active, t });

    const MainPageItem = ItemFactory.create({ name: 'main-page' });
    const ResultsItem = ItemFactory.create({ name: 'results' });
    const NotificationsItem = ItemFactory.create({
        name: 'notifications',
        rightIcon:
            notificationsCount > 0 ? (
                <SecondaryLabel label={notificationsCount} />
            ) : undefined,
    });
    const SettingsItem = ItemFactory.create({ name: 'settings' });
    const LogoutItem = ItemFactory.create({ name: 'logout' });
    const CreateBlogArticleItem = ItemFactory.create({
        name: 'create-blog-article',
    });
    const NewsletterItem = ItemFactory.create({ name: 'newsletter' });
    const ArchiveItem = ItemFactory.create({ name: 'archive' });
    const AgreementsItem = ItemFactory.create({ name: 'agreements' });

    const drawer = (
        <Grid
            container
            direction="column"
            justify={device === 'DESKTOP' ? 'space-between' : 'flex-start'}
            classes={{ root: classes.container }}
        >
            <Grid item>
                <List>
                    <SingleItem item={MainPageItem} onClick={onClick} />
                    <SingleItem item={ResultsItem} onClick={onClick} />
                    <SingleItem item={AgreementsItem} onClick={onClick} />
                    <SingleItem item={NewsletterItem} onClick={onClick} />
                    <SingleItem item={ArchiveItem} onClick={onClick} />
                    <SingleItem
                        item={CreateBlogArticleItem}
                        onClick={onClick}
                    />
                    <SingleItem item={NotificationsItem} onClick={onClick} />
                    <SingleItem item={SettingsItem} onClick={onClick} />
                </List>
            </Grid>
            <Grid item>
                <SingleItem item={LogoutItem} onClick={onClick} />
            </Grid>
        </Grid>
    );

    return (
        <div className={classes.drawer}>
            <MenuDrawer device={device} onClose={onClose} open={open}>
                <>
                    {device !== 'DESKTOP' && <LabeledHeader />}
                    {drawer}
                </>
            </MenuDrawer>
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        drawer: {
            width: ({ width }: { width: number }) => width,
            flexShrink: 0,
        },
        container: {
            display: 'flex',
            flexWrap: 'nowrap',
            height: '100%',
        },
    }),
);
