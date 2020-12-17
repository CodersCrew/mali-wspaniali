import React from 'react';
import { makeStyles, Theme, createStyles, List, Grid, Divider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Me } from '../../../graphql/types';
import { CollapsibleList } from './CollapsibleList';
import { getParentMenuItemFactory, getChildMenuItemFactory, getBlogMenuItemFactory } from './menuItemFactory';
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

export const ParentSidebar = ({ onClick, onClose, user, active, open }: Props) => {
    const device = useBreakpoints();

    const [, innerMargin] = getMenuWidth(device);
    const classes = useStyles({ width: innerMargin });
    const { t } = useTranslation();

    if (!user) return null;

    const notificationsCount = user.notifications.length;

    const ItemFactory = getParentMenuItemFactory({ active, t });
    const BlogItemFactory = getBlogMenuItemFactory({ active, t });

    const MainPageItem = ItemFactory.create({ name: 'main-page' });
    const NotificationsItem = ItemFactory.create({
        name: 'notifications',
        rightIcon: notificationsCount ? <SecondaryLabel label={notificationsCount} /> : undefined,
    });
    const SettingsItem = ItemFactory.create({ name: 'settings' });
    const LogoutItem = ItemFactory.create({ name: 'logout' });
    const BlogItem = BlogItemFactory.create({ active, t });
    const AgreementsItem = ItemFactory.create({ name: 'agreements' });

    const drawer = (
        <Grid
            container
            direction="column"
            justify={device === 'DESKTOP' ? 'space-between' : 'flex-start'}
            className={classes.container}
        >
            <Grid item>
                <List>
                    <SingleItem item={MainPageItem} onClick={onClick} />
                    <Divider />
                    {user.children.map((child) => {
                        const ChildItemFactory = getChildMenuItemFactory({ active, t });

                        const { mainItem, subItems } = ChildItemFactory.create({ child });

                        return (
                            <CollapsibleList
                                key={child._id}
                                mainItem={mainItem}
                                subItems={subItems}
                                onClick={onClick}
                            />
                        );
                    })}
                    <CollapsibleList mainItem={BlogItem.mainItem} subItems={BlogItem.subItems} onClick={onClick} />
                    <SingleItem item={AgreementsItem} onClick={onClick} />
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'nowrap',
            height: '100%',
        },
        drawer: {
            flexShrink: 0,
            width: ({ width }: { width: number }) => width,
        },
    }),
);
