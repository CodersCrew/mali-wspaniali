export const emailTest = (email: string) => {
    const regex = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$');

    return regex.test(email);
};