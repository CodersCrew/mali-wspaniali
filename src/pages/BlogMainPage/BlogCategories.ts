import i18n from 'i18next';

const {t} = i18n;
 
export const categories = {
  
    all: { name: t('blog-categories.all'), color: 'orange' },
    food: { name: t('blog-categories.food'), color: 'yellow' },
    activity: { name: t('blog-categories.physical-activity'), color: 'purple' },
    emotions: { name: t('blog-categories.emotions'), color: 'lightOrange' },
    other: { name: t('blog-categories.other'), color: 'blue' }
};
  
export const categoriesList = Object.entries(categories).map(([key, value]) => {
    return {key, ...value};
});