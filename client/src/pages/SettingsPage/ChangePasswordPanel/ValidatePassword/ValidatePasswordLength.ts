export const validatePasswordLength = (password: string) => {
    const regex = new RegExp('^.{8,}$');

    return regex.test(password);
};
