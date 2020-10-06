// https://github.com/ngryman/reading-time/blob/master/lib/reading-time.js
export function calculateReadingTime(articleContent: string): number {
    const amountWordsInArticles = articleContent.split(' ').length;
    const readingTimeInMinutes = amountWordsInArticles / 200;

    return Math.ceil(Number(readingTimeInMinutes.toFixed(2)));
}
