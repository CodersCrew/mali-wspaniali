import { makeStyles, createStyles, List, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Me } from '@app/graphql/types';
import { CollapsibleList } from './CollapsibleList';
import { getBlogMenuItemFactory, getInstructorMenuItemFactory } from './menuItemFactory';
import { SingleItem } from './SingleItem';
import { MenuDrawer } from './MenuDrawer';
import { useBreakpoints } from '../../../queries/useBreakpoints';
import { getMenuWidth } from './getMenuWidth';
import { LabeledHeader } from './LabeledHeader';
import { SecondaryLabel } from '../../Label';

export interface Props {
    user: Me | null;
    onClick: (link?: string) => void;
    active: string[];
}

export const InstructorSidebar = ({ onClick, user, active }: Props) => {
    const device = useBreakpoints();

    const [, innerMargin] = getMenuWidth(device);
    const classes = useStyles({ width: innerMargin });
    const { t } = useTranslation();

    if (!user) return null;

    const unreadedNotificationsCount = user.notifications.filter((n) => !n.isRead).length;

    const ItemFactory = getInstructorMenuItemFactory({ active, t });
    const BlogItemFactory = getBlogMenuItemFactory({ active, t });

    const MainPageItem = ItemFactory.create({ name: 'add-results' });
    const AgreementsItem = ItemFactory.create({ name: 'agreements' });
    const SettingsItem = ItemFactory.create({ name: 'settings' });
    const LogoutItem = ItemFactory.create({ name: 'logout' });
    const BlogItem = BlogItemFactory.create({ active, t });
    const NotificationsItem = ItemFactory.create({
        name: 'notifications',
        rightIcon: unreadedNotificationsCount ? <SecondaryLabel label={unreadedNotificationsCount} /> : undefined,
    });

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
                    <SingleItem item={AgreementsItem} onClick={onClick} />
                    <CollapsibleList mainItem={BlogItem.mainItem} subItems={BlogItem.subItems} onClick={onClick} />
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
            <MenuDrawer device={device}>
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
