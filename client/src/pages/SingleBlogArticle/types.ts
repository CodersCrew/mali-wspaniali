export type Path = {
    category: string;
    subtitle: string;
    readingTime: number;
};
export type Content = {
    category: string[];
    header: string;
    pictureUrl: string;
    contentHTML: string;
};
export type Video = {
    videoUrl: string;
    tags: string[];
};
