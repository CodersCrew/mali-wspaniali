export function formatDate(date: Date) {
    return date
        .toLocaleDateString()
        .split('/')
        .reverse()
        .join('-');
}
