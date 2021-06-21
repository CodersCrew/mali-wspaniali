export type ArticleType = {
    category: string;
    contentHTML: string;
    description: string;
    pictureUrl: string;
    redactor: {
        avatarUrl: string;
        firstName: string;
        lastName: string;
        profession: string;
        biography: string;
    };
    tags: Array<string>;
    title: string;
    videoUrl: string;
};
