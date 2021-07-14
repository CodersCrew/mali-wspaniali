export const articleContent = (isPreview: boolean | undefined, componentProperty: string, previewText: string) => {
    if (isPreview) {
        if (componentProperty) return componentProperty;

        return previewText;
    }

    return componentProperty;
};

export const isDisabledArticleClassVisible = (isPreview: boolean | undefined, componentProperty: string | boolean) => {
    return !componentProperty && isPreview;
};

export const htmlContent = [
    { text: 'title', marginBottom: 2 },
    { text: 'first-paragraph', marginBottom: 2 },
    { text: 'second-paragraph', marginBottom: 2 },
    { text: 'third-paragraph', marginBottom: 2 },
    { text: 'fourth-paragraph', marginBottom: 0 },
];
