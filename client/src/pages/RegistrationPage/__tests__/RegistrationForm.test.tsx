import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { RegistrationForm } from '../RegistrationForm';
import * as userQueries from '../../../queries/userQueries';
// import * as Dialog from '../../../components/AlertDialog';

describe('Registration Form', () => {
    // let alertDialogSpy: jasmine.Spy;
    let registerForm: RenderResult;
    let emailInput: HTMLElement;
    // let passwordInput: HTMLElement;
    // let confirmPasswordInput: HTMLElement;
    let button: HTMLElement;

    beforeEach(async () => {
        spyOn(userQueries, 'createUser').and.returnValue(Promise.resolve());

        // alertDialogSpy = spyOn(Dialog, 'openAlertDialog').and.returnValue(null);

        registerForm = await render(<RegistrationForm />);
        button = await registerForm.findByRole('button');
        emailInput = await registerForm.findByTestId('email');
        // passwordInput = await registerForm.findByTestId('password');
        // confirmPasswordInput = await registerForm.findByTestId('confirmPassword');
    });

    describe('when email is not valid', () => {
        beforeEach(() => {
            fireEvent.change(emailInput, { target: { value: 'notvalid' } });
        });

        it('disables the next button', () => {
            expect(button).toHaveAttribute('disabled');
        });
    });

    // describe('when password is not strong enough', () => {
    //     beforeEach(() => {
    //         fireEvent.change(emailInput, { target: { value: 'my@email.com' } });
    //         fireEvent.change(passwordInput, {
    //             target: { value: 'my-weak-password' },
    //         });
    //         fireEvent.change(confirmPasswordInput, {
    //             target: { value: 'my-weak-password' },
    //         });

    //         fireEvent.click(button);
    //     });

    //     it('invokes alert message', () => {
    //         expect(alertDialogSpy).toHaveBeenCalledTimes(1);

    //         expect(alertDialogSpy).toHaveBeenCalledWith(
    //             expect.objectContaining({
    //                 description: 'registration-page.password-not-strong',
    //                 type: 'error',
    //             }),
    //         );
    //     });
    // });

    // describe('when password is strong', () => {
    //     beforeEach(() => {
    //         fireEvent.change(emailInput, { target: { value: 'my@email.com' } });
    //         fireEvent.change(passwordInput, {
    //             target: { value: 'my-Str0ng-password' },
    //         });
    //         fireEvent.change(confirmPasswordInput, {
    //             target: { value: 'my-Str0ng-password' },
    //         });

    //         fireEvent.click(button);
    //     });

    //     it('does not invoke alert message', () => {
    //         expect(alertDialogSpy).toHaveBeenCalledTimes(0);
    //     });
    // });

    // describe('when password and confirm password are not equal', () => {
    //     beforeEach(() => {
    //         fireEvent.change(emailInput, { target: { value: 'my@email.com' } });
    //         fireEvent.change(passwordInput, {
    //             target: { value: 'my-Str0ng-password' },
    //         });
    //         fireEvent.change(confirmPasswordInput, {
    //             target: { value: 'my-Wr0ng-password' },
    //         });

    //         fireEvent.click(button);
    //     });

    //     it('invokes alert message', () => {
    //         expect(alertDialogSpy).toHaveBeenCalledTimes(1);

    //         expect(alertDialogSpy).toHaveBeenCalledWith(
    //             expect.objectContaining({
    //                 description: 'registration-page.password-mismatch',
    //                 type: 'error',
    //             }),
    //         );
    //     });
    // });

    // describe('when password and confirm password are equal', () => {
    //     beforeEach(() => {
    //         fireEvent.change(emailInput, { target: { value: 'my@email.com' } });
    //         fireEvent.change(passwordInput, {
    //             target: { value: 'my-Passw0rd' },
    //         });
    //         fireEvent.change(confirmPasswordInput, {
    //             target: { value: 'my-Passw0rd' },
    //         });

    //         fireEvent.click(button);
    //     });

    //     it('does not invoke alert message', () => {
    //         expect(alertDialogSpy).toHaveBeenCalledTimes(0);
    //     });
    // });
});
