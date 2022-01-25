declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveTranslation(expected: string): R;
        }
    }
}

export {};
