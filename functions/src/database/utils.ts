export const setFileName = () => {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    return `backup-${date}.json`;
};
