export const articleContent = (isPreView: boolean | undefined, componentProperty: string, previewText: string) => {
    if (componentProperty || (!componentProperty && !isPreView)) return componentProperty;

    return previewText;
};

export const isDisabledArticleClassVisible = (isPreView: boolean | undefined, componentProperty: string | boolean) => {
    return !!(componentProperty || (!componentProperty && !isPreView));
};

export const htmlContent = [
    { text: 'title', variant: 'h4', marginBottom: 2 },
    { text: 'first-paragraph', variant: 'body1', marginBottom: 2 },
    { text: 'second-paragraph', variant: 'body1', marginBottom: 2 },
    { text: 'third-paragraph', variant: 'body1', marginBottom: 2 },
    { text: 'fourth-paragraph', variant: 'body1', marginBottom: 0 },
];