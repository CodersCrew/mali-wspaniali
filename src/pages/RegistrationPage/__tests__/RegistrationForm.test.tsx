import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { RegistrationForm } from '../RegistrationForm';
import * as userQueries from '../../../queries/userQueries';
import * as Dialog from '../../../components/AlertDialog';

describe('Registration Form', () => {
  let alertDialogSpy: jasmine.Spy;
  let registerForm: RenderResult;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let confirmPasswordInput: HTMLElement;
  let button: HTMLElement;

  beforeEach(async () => {
    spyOn(userQueries, 'createUser').and.returnValue(Promise.resolve());

    alertDialogSpy = spyOn(Dialog, 'openAlertDialog').and.returnValue(null);

    registerForm = await render(<RegistrationForm />);
    button = await registerForm.findByRole('button');
    emailInput = await registerForm.findByTestId('email');
    passwordInput = await registerForm.findByTestId('password');
    confirmPasswordInput = await registerForm.findByTestId('confirmPassword');
  });

  describe('when password and confirm password are not equal', () => {
    beforeEach(() => {
      fireEvent.change(emailInput, { target: { value: 'my@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'my-password' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'my-wrong-password' },
      });

      fireEvent.click(button);
    });

    it('invokes alert message', () => {
      expect(alertDialogSpy).toHaveBeenCalledTimes(1);

      expect(alertDialogSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'registration-page.password-mismatch',
          type: 'error'
        }),
        // expect.anything(),
      );
    });
  });

  describe('when password and confirm password are equal', () => {
    beforeEach(() => {
      fireEvent.change(emailInput, { target: { value: 'my@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'my-password' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'my-password' },
      });

      fireEvent.click(button);
    });

    it('does not invoke alert message', () => {
      expect(alertDialogSpy).toHaveBeenCalledTimes(0);
    });
  });
});
