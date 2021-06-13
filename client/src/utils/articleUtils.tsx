export const isArticlePreviewVisible = (isPreView: boolean, componentProperty: any) => {
    if (componentProperty || (!componentProperty && !isPreView)) return false;

    return true;
};
