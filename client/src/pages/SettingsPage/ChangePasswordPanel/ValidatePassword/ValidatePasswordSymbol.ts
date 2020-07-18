export const validatePasswordSymbol = (password: string) => {
    const regex = new RegExp('^(?=.*?[#?!@$%^&*-])');

    return regex.test(password);
};
