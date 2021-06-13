import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { useBreakpoints, useIsDevice } from '../../queries/useBreakpoints';
import { CategoryTabsMobile } from './CategoryTabsMobile';
import { CategoryTabs } from './CategoryTabs';
import { CategoryItem } from '../../pages/ArticleListPage/BlogCategories';
import { ChildProfileCategoryItem } from '../../pages/ChildProfile/ChildProfileCategory';
import { useSidebarState } from '../../utils/useSidebar';

interface Props<T extends CategoryItem | ChildProfileCategoryItem> {
    activeCategory: string;
    categories: T[];
    name: string;
    onChange: (value: string) => void;
}

export function MobileAwareCategoryTabs<T extends CategoryItem | ChildProfileCategoryItem>({
    activeCategory: category,
    categories,
    name,
    onChange,
}: Props<T>) {
    const classes = useStyles();
    const { isMobile } = useIsDevice();
    const sidebarState = useSidebarState();
    const device = useBreakpoints();

    if (sidebarState.isOpen && device !== 'DESKTOP') return <> </>;

    return isMobile ? (
        <div className={`${classes.navigationMobile} ${classes.baseNavigation}`}>
            <CategoryTabsMobile name={name} categories={categories} currentCategory={category} onChange={onChange} />
        </div>
    ) : (
        <div className={`${classes.navigation} ${classes.baseNavigation}`}>
            <CategoryTabs name={name} categories={categories} currentCategory={category} onChange={onChange} />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        baseNavigation: {
            zIndex: 1200,
            position: 'sticky',
            top: '64px',
        },
        navigation: {
            backgroundColor: theme.palette.primary.contrastText,
            padding: theme.spacing(0),
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
        },
        navigationMobile: {
            backgroundColor: theme.palette.primary.main,
            padding: `0 ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
        },
    }),
);
