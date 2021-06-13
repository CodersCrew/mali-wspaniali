export type ArticleType = {
    category: string;
    contentHTML: string;
    description: string;
    pictureUrl: string;
    readingTime: number;
    redactor: {
        avatarUrl: string;
        firstName: string;
        lastName: string;
        profession: string;
        biography: string;
    };
    tags: Array<any>;
    title: string;
    videoUrl: string;
};
