export const emailTest = (email: string): boolean => {
    const regex = new RegExp(
        '^(([^<>()\\[\\].,;:\\s@"]+(\\.[^<>()\\[\\].,;:\\s@"]+)*)|(".+"))@(([^<>()[\\].,;:\\s@"]+\\.)+[^<>()[\\].,;:\\s@"]{2,})$',
    );

    return regex.test(email);
};
