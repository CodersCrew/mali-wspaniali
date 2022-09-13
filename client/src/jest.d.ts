declare global {
    namespace jest {
        interface Matchers<R> {
            toBeTranslationOf(expected: string): R;
        }
    }
}

export {};
