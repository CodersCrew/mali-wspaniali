const MIN_CODE_LENGTH = 12;

const isValidKeyCodeString = (key: string): boolean => {
    return key.length >= MIN_CODE_LENGTH;
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

    // valid if the passed string is at least MIN_CODE_LENGTH characters long
    // TODO: Is it justified here? Isn't it unnecessarily redundant to 'protected isKeyCodeValid'?
    isValid = (): boolean => {
        return this.isKeyCodeValid();
    };

    // valid if the passed string isValidRoleBasedKeyCode and begins with 'I.' or 'P.'
    isRoleBasedKeyCodeValid = (): boolean => {
        if (!isValidKeyCodeString(this.key)) return false;
        if (this.key.substr(1, 1) !== '.') return false;

        return !(this.key.substr(0, 1) in ['I', 'P']);
    };

    // valid if the passed string is at least MIN_CODE_LENGTH characters long
    protected isKeyCodeValid = (): boolean => {
        return this.parseToKeyCode().length >= MIN_CODE_LENGTH - 2;
    };
}
