export const articleContent = (isPreView: any, componentProperty: any, previewText: any) => {
    if (componentProperty || (!componentProperty && !isPreView)) return componentProperty;

    return previewText;
};

export const isDisabledArticleClassVisible = (isPreView: any, componentProperty: any) => {
    if (componentProperty || (!componentProperty && !isPreView)) return false;

    return true;
};
