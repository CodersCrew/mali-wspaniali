import React from 'react';
import { makeStyles, Theme, createStyles, List, Grid } from '@material-ui/core';
import { Me } from '../../../graphql/types';
import { CollapsibleList } from './CollapsibleList';
import { childMenuItemFactory, menuItemFactory, blogMenuItemFactory } from './menuItemFactory';
import { useTranslation } from 'react-i18next';
import { SingleItem } from './SingleItem';
import { SecondaryLabel } from '../../Label';
import { MenuDrawer } from './MenuDrawer';

export interface Props {
    user: Me | null;
    onClick: (link?: string) => void;
    onClose: () => void;
    active: string[];
    open: boolean;
}

const drawerWidth = 354;

export const ParentSidebar = ({ onClick, onClose, user, active, open }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    if (!user) return null;

    const notificationsCount = user.notifications.length;

    const MainPageItem = menuItemFactory({ name: 'main-page', active, t });
    const NotificationsItem = menuItemFactory({
        name: 'notifications',
        rightIcon: notificationsCount ? <SecondaryLabel label={notificationsCount} /> : undefined,
        active,
        t,
    });
    const SettingsItem = menuItemFactory({ name: 'settings', active, t });
    const LogoutItem = menuItemFactory({ name: 'logout', active, t });
    const BlogItem = blogMenuItemFactory({ active, t });
    const AgreementsItem = menuItemFactory({ name: 'agreements', active, t });

    const drawer = (
        <Grid container direction="column" justify="space-between" classes={{ root: classes.container }}>
            <Grid item>
                <List>
                    <SingleItem item={MainPageItem} onClick={onClick} />
                    {user.children.map(child => {
                        const ChildItem = childMenuItemFactory({ child, active, t });

                        return (
                            <CollapsibleList
                                key={child._id}
                                mainItem={ChildItem.mainItem}
                                subItems={ChildItem.subItems}
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
            <MenuDrawer onClose={onClose} open={open}>
                {drawer}
            </MenuDrawer>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        container: {
            height: '100%',
            flexWrap: 'nowrap',
        },
    }),
);
