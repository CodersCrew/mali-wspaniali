const CODE_LENGTH = 12;

const isValidKeyCodeString = (key: string): boolean => {
    return key.length >= CODE_LENGTH;
};

export class RoleBasedKeyCodeObject {
    private constructor(private key: string) {}

    static from(key: string) {
        if (isValidKeyCodeString(key)) return new RoleBasedKeyCodeObject(key);

        return undefined;
    }

    parseToKeyCode = (): string => {
        return this.key.substr(2);
    };

    // valid if the passed string begins with 'I.'
    isInstructor = (): boolean => {
        return this.key.substr(0, 2) === 'I.';
    };

    // valid if the passed string is at least CODE_LENGTH characters long
    isValid = (): boolean => {
        if (this.key.length !== CODE_LENGTH) return false;
        if (this.key.substr(1, 1) !== '.') return false;

        return ['I', 'P'].includes(this.key.substr(0, 1));
    };
}
