export const passwordStrengthTest = (text: string) => {
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    return regex.test(text);
};

export const passwordLengthTest = (text: string) => {
    return text.length >= 8;
};

export const passwordCapitalTest = (text: string) => {
    const regex = new RegExp('(?=.*[A-Z])');
    
    return regex.test(text);
};

export const passwordDigitTest = (text: string) => {
    const regex = new RegExp('(?=.*?[0-9])');
    
    return regex.test(text);
};

export const passwordSpecialTest = (text: string) => {
    const regex = new RegExp('(?=.*?[#?!@$%^&*-])');
    
    return regex.test(text);
};
