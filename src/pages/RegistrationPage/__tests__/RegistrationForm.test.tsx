import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RegistrationForm } from '../RegistrationForm';

describe('Registration Form', () => {
  it('calls registerUser function', async () => {
    const registerUser = jest.fn().mockReturnValue(Promise.resolve());

    render(<RegistrationForm registerUser={registerUser} />);
    const button = await screen.findByRole('button');
    fireEvent.click(button);

    expect(registerUser).toHaveBeenCalledTimes(1);
  });
});
