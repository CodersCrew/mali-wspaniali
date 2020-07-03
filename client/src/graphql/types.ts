export type ArticleCategory = 'all' | 'food' | 'activity' | 'emotions' | 'other';

export interface Article {
    id: string;
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
    shortDescription: string;
}
