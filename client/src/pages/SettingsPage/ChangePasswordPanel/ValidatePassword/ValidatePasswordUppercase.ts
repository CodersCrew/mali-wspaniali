export const validatePasswordUppercase = (password: string) => {
    const regex = new RegExp('^(?=.*?[A-Z])');
    return regex.test(password);
};
