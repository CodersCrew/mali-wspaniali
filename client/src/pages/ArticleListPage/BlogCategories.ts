import i18n from 'i18next';

export type CategoryItem = { key: string; name: string; color: string };

export const categories = {
    all: { name: i18n.t('blog-categories.all'), color: 'orange' },
    food: { name: i18n.t('blog-categories.food'), color: 'yellow' },
    activity: { name: i18n.t('blog-categories.activity'), color: 'purple' },
    emotions: {
        name: i18n.t('blog-categories.emotions'),
        color: 'lightOrange',
    },
    other: { name: i18n.t('blog-categories.other'), color: 'blue' },
};

export const categoriesList: CategoryItem[] = Object.entries(categories).map(
    ([key, value]) => {
        return { key, ...value };
    },
);
