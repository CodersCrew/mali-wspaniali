import { useTranslation } from 'react-i18next';
// import { ArticleInput } from '../../graphql/types';

export const modules = {
    toolbar: [
        [{ header: 1 }, { header: 2 }],
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
};

export const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

export const articleCategories = () => {
    const { t } = useTranslation();

    return [
        {
            value: 'food',
            label: t('admin-articles.category-food'),
        },
        {
            value: 'activity',
            label: t('admin-articles.category-activity'),
        },
        {
            value: 'emotions',
            label: t('admin-articles.category-emotions'),
        },
        {
            value: 'other',
            label: t('admin-articles.category-other'),
        },
    ];
};

export const tags = ['sport', 'stres', 'odporność', 'styl życia', 'jedzenie'];

export const initialValues: any = {
    title: '',
    category: '',
    pictureUrl: '',
    description: '',
    contentHTML: '',
    videoUrl: '',
    tags: [],
    redactor: {
        firstName: '',
        lastName: '',
        profession: '',
        avatarUrl: '',
        biography: '',
    },
};

export const redactorData = [
    { data: 'firstName', label: 'author-first-name' },
    { data: 'lastName', label: 'author-last-name' },
    { data: 'profession', label: 'author-profession' },
    { data: 'avatarUrl', label: 'avatar' },
    { data: 'biography', label: 'author-biography' },
];

export const mandatoryObject = (object: any) => {
    const obligatoryArticleField = object;

    delete obligatoryArticleField?.category;
    delete obligatoryArticleField?.videoUrl;
    delete obligatoryArticleField?.redactor?.avatarUrl;
    delete obligatoryArticleField?.redactor?.biography;

    return obligatoryArticleField;
};
