export type CategoryItem = { key: string; color: string };

export const categories = {
    all: { color: 'orange' },
    food: { color: 'yellow' },
    activity: { color: 'purple' },
    emotions: { color: 'lightOrange' },
    other: { color: 'blue' },
};

export const categoriesList: CategoryItem[] = Object.entries(categories).map(([key, value]) => {
    return { key, ...value };
});
