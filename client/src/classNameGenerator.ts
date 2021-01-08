// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's an improved version of
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
//
// Copied from material-ui due to issue https://github.com/callemall/material-ui/issues/8223

// This counter is moved outside from `createGenerateClassName` to solve the issue
let ruleCounter = 0;

export default function createGenerateClassName() {
    return (rule: any, sheet: any) => {
        ruleCounter += 1;

        if (process.env.NODE_ENV === 'production') {
            return `c${ruleCounter}`;
        }

        if (sheet && sheet.options.meta) {
            return `${sheet.options.meta}-${rule.key}-${ruleCounter}`;
        }

        return `${rule.key}-${ruleCounter}`;
    };
}
