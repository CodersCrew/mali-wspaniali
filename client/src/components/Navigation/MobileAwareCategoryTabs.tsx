import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { Device } from '../../queries/useBreakpoints';
import { CategoryItem } from '../../pages/ArticleListPage/BlogCategories';
import { ChildProfileCategoryItem } from '../../pages/ChildProfile/ChildProfileCategory';

import { CategoryTabsMobile } from './CategoryTabsMobile';
import { CategoryTabs } from './CategoryTabs';

interface Props<T extends CategoryItem | ChildProfileCategoryItem> {
    device: Device;
    category: string;
    values: T[];
    onTabChange: (value: string) => void;
}

export function MobileAwareCategoryTabs<T extends CategoryItem | ChildProfileCategoryItem>({
    device,
    category,
    values,
    onTabChange,
}: Props<T>) {
    const classes = useStyles();

    return device === 'MOBILE' ? (
        <div className={classes.navigationMobile}>
            <CategoryTabsMobile values={values} active={category} onClick={onTabChange} />
        </div>
    ) : (
        <div className={classes.navigation}>
            <CategoryTabs values={values} active={category} onClick={onTabChange} />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navigation: {
            backgroundColor: theme.palette.primary.contrastText,
            padding: `0 ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
        },
        navigationMobile: {
            backgroundColor: theme.palette.primary.main,
            padding: `0 ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
        },
    }),
);
