import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RegistrationForm } from '../RegistrationForm';
import * as userQueries from '../../../queries/userQueries';

describe('Registration Form', () => {
  let createUserSpy: jasmine.Spy;

  beforeEach(() => {
    createUserSpy = spyOn(userQueries, 'createUser').and.returnValue(
      Promise.resolve(),
    );
  });
  it('calls registerUser function', async () => {
    render(<RegistrationForm />);
    const button = await screen.findByRole('button');
    fireEvent.click(button);

    expect(createUserSpy).toHaveBeenCalledTimes(1);
  });
});
