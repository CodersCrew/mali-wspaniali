/**
 * Reading time is calculate based on library: https://github.com/ngryman/reading-time/blob/master/lib/reading-time.js
 * @param articleContent
 */
export const calculateReadingTime = (articleContent: string): number => {
    const amountWordsInArticles: number = articleContent.split(' ').length;
    const readingTimeInMinutes: number = amountWordsInArticles/200;

    return Math.ceil(Number(readingTimeInMinutes.toFixed(2)));
}