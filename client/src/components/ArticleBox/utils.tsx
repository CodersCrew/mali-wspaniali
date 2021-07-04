export const articleContent = (isPreView: boolean | undefined, componentProperty: string, previewText: string) => {
    if (componentProperty || (!componentProperty && !isPreView)) return componentProperty;

    return previewText;
};

export const isDisabledArticleClassVisible = (isPreView: boolean | undefined, componentProperty: string | boolean) => {
    return !componentProperty && isPreView;
};

export const htmlContent = [
    { text: 'title', marginBottom: 2 },
    { text: 'first-paragraph', marginBottom: 2 },
    { text: 'second-paragraph', marginBottom: 2 },
    { text: 'third-paragraph', marginBottom: 2 },
    { text: 'fourth-paragraph', marginBottom: 0 },
];
