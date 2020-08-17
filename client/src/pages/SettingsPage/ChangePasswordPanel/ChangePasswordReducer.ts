export const TYPE_OLD_PASSWORD = 'TYPE_OLD_PASSWORD';
export const TYPE_NEW_PASSWORD = 'TYPE_NEW_PASSWORD';

export const ChangePasswordInitialState = {
    oldPassword: '',
    oldPasswordVisibility: false,
    activeState: 'TYPE_OLD_PASSWORD',
};

export function ChangePasswordReducer(
    state: typeof ChangePasswordInitialState,
    action: { type: string; values?: { [index: string]: string | boolean } },
) {
    if (action.type === 'changeOldPasswordVisibility') {
        return { ...state, oldPasswordVisibility: !state.oldPasswordVisibility };
    }

    if (action.type === 'changeOldPassword') {
        if (action.values!.isSuccess) {
            return { ...state, activeState: TYPE_NEW_PASSWORD };
        }

        return { ...state, activeState: TYPE_OLD_PASSWORD };
    }

    return state;
}
