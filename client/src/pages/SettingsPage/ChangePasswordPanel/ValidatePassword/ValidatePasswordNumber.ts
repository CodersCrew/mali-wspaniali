export const validatePasswordNumber = (password: string) => {
    const regex = new RegExp('^(?=.*?[0-9])');

    return regex.test(password);
};
