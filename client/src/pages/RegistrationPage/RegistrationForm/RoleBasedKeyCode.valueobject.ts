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

    // valid if the passed string begins with 'I.' or 'in'
    isInstructor = (): boolean => {
        return /^(I\.|in)/.test(this.key);
    };

    isValid = (): boolean => {
        return /^(([P|I]\.)|(pa|in))\w{10}/.test(this.key);
    };
}
