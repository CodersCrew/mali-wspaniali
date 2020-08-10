export type ArticleCategory = 'food' | 'activity' | 'emotions' | 'other';

export interface Article {
    _id: string;
    header: string;
    pictureUrl: string;
    title: string;
    subtitle: string;
    contentHTML: string;
    tags: string[];
    category: ArticleCategory;
    description: string;
    videoUrl: string;
    readingTime: number;
    redactor: Redactor;
    date: Date;
}

export interface Redactor {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    profession: string;
    biography: string;
}

export interface User {
    email: string;
}

export interface ReturnedStatus {
    status: boolean;
}

export interface ReturnedToken {
    login: {
        token: string;
    };
}

export interface UserInput {
    mail: string;
    password: string;
    keyCode: string;
}
