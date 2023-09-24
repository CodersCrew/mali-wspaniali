const CODE_LENGTH = 12;

const isValidKeyCodeString = (key: string): boolean => {
    return key.length >= CODE_LENGTH;
};

export class RoleBasedKeyCodeObject {
    private constructor(private key: string) {}

    static from(key: string) {
        const keyNoSpaces = key.replace(/ /g, '');

        if (isValidKeyCodeString(keyNoSpaces)) {
            return new RoleBasedKeyCodeObject(keyNoSpaces);
        }

        return undefined;
    }

    parseToKeyCode = (): string => {
        const key = this.key.replace(/ /g, '');

        return key.substr(2);
    };

    // valid if the passed string begins with 'I.'
    isInstructor = (): boolean => {
        const key = this.key.replace(/ /g, '');

        return key.substr(0, 2) === 'I.';
    };

    // valid if the passed string excluding spaces is at least CODE_LENGTH characters long
    // and has the dot at the second place
    isValid = (): boolean => {
        const key = this.key.replace(/ /g, '');

        if (key.length !== CODE_LENGTH) return false;
        if (key.substr(1, 1) !== '.') return false;

        return ['I', 'P'].includes(key.substr(0, 1));
    };
}
