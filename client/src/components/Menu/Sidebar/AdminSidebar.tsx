import { makeStyles, createStyles, List, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Me } from '../../../graphql/types';
import { getAdminMenuItemFactory, getNewsletterMenuItemFactory, getResultsMenuItemFactory } from './menuItemFactory';
import { SingleItem } from './SingleItem';
import { SecondaryLabel } from '../../Label';
import { MenuDrawer } from './MenuDrawer';
import { useBreakpoints } from '../../../queries/useBreakpoints';
import { getMenuWidth } from './getMenuWidth';
import { LoggedAsItem } from './LoggedAsItem';
import { CollapsibleList } from './CollapsibleList';

export interface Props {
    user: Me | null;
    onClick: (link?: string) => void;
    onClose: () => void;
    active: string[];
    open: boolean;
}

export const AdminSidebar = ({ onClick, onClose, user, active, open }: Props) => {
    const { t } = useTranslation();
    const device = useBreakpoints();
    const [, innerMargin] = getMenuWidth(device);

    const classes = useStyles({ width: innerMargin });
    if (!user) return null;

    const unreadedNotificationsCount = user.notifications.filter((n) => !n.isRead).length;

    const ItemFactory = getAdminMenuItemFactory({ active, t });
    const ResultsItemFactory = getResultsMenuItemFactory({ active, t });
    const NewsletterItemFactory = getNewsletterMenuItemFactory({ active, t });

    const { mainItem: ResultsMainItem, subItems: ResultsSubItems } = ResultsItemFactory.create({ active, t });
    const { mainItem: NewsletterMainItem, subItems: NewsletterSubItems } = NewsletterItemFactory.create({ active, t });
    const NotificationsItem = ItemFactory.create({
        name: 'notifications',
        rightIcon: unreadedNotificationsCount > 0 ? <SecondaryLabel label={unreadedNotificationsCount} /> : undefined,
    });
    const SettingsItem = ItemFactory.create({ name: 'settings' });
    const LogoutItem = ItemFactory.create({ name: 'logout' });
    const ArticlesItem = ItemFactory.create({ name: 'articles' });
    const KindergartensItem = ItemFactory.create({ name: 'kindergartens' });
    const CodeItem = ItemFactory.create({ name: 'keycodes' });
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
                    <LoggedAsItem name={user.mail} />
                    <CollapsibleList mainItem={ResultsMainItem} subItems={ResultsSubItems} onClick={onClick} />
                    <CollapsibleList mainItem={NewsletterMainItem} subItems={NewsletterSubItems} onClick={onClick} />
                    <SingleItem item={AgreementsItem} onClick={onClick} />
                    <SingleItem item={ArticlesItem} onClick={onClick} />
                    <SingleItem item={KindergartensItem} onClick={onClick} />
                    <SingleItem item={CodeItem} onClick={onClick} />
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
                {drawer}
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
