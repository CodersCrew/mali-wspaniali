import i18n from 'i18next';

export type ChildProfileCategoryItem = { key: string; name: string };

export const categories = {
    results: { name: i18n.t('parent-menu.child.results') },
    recommendations: { name: i18n.t('parent-menu.child.recommendations') },
    'tests-information': {
        name: i18n.t('parent-menu.child.tests-information'),
    },
    details: { name: i18n.t('parent-menu.child.details') },
};

export const childProfileCategoriesList: ChildProfileCategoryItem[] = Object.entries(categories).map(([key, value]) => {
    return { key, ...value };
});
