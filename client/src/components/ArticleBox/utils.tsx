export const articleContent = (isPreView: boolean | undefined, componentProperty: string, previewText: string) => {
    if (componentProperty || (!componentProperty && !isPreView)) return componentProperty;

    return previewText;
};

export const isDisabledArticleClassVisible = (isPreView: boolean | undefined, componentProperty: string | boolean) => {
    if (componentProperty || (!componentProperty && !isPreView)) return false;

    return true;
};
