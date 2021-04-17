import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { useIsDevice } from '../../queries/useBreakpoints';
import { CategoryTabsMobile } from './CategoryTabsMobile';
import { CategoryTabs } from './CategoryTabs';
import { CategoryItem } from '../../pages/ArticleListPage/BlogCategories';
import { ChildProfileCategoryItem } from '../../pages/ChildProfile/ChildProfileCategory';

interface Props<T extends CategoryItem | ChildProfileCategoryItem> {
    activeCategory: string;
    categories: T[];
    onChange: (value: string) => void;
}

export function MobileAwareCategoryTabs<T extends CategoryItem | ChildProfileCategoryItem>({
    activeCategory: category,
    categories,
    onChange,
}: Props<T>) {
    const classes = useStyles();
    const { isMobile } = useIsDevice();

    return isMobile ? (
        <div className={classes.navigationMobile}>
            <CategoryTabsMobile categories={categories} currentCategory={category} onChange={onChange} />
        </div>
    ) : (
        <div className={classes.navigation}>
            <CategoryTabs categories={categories} currentCategory={category} onChange={onChange} />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
