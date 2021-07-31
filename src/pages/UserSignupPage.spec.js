import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';

describe('UserSignup', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Sign Up');
    });
    it('has input for display name', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Your display name');
      expect(displayNameInput).toBeInTheDocument();
    });
    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const userNameInput = queryByPlaceholderText('Your username');
      expect(userNameInput).toBeInTheDocument();
    });
    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      expect(passwordInput).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      expect(passwordInput.type).toBe('password');
    });
    it('has input for password repeat', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText('Repeat your password');
      expect(passwordRepeat).toBeInTheDocument();
    });
    it('has password type for repeat password input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText('Repeat your password');
      expect(passwordRepeat.type).toBe('password');
    });
    it('has submit button', () => {
      const { container } = render(<UserSignupPage />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    // extract changeEvent function
    const changeEvent = (content) => {
      return {
        target: {
          value: content
        }
      }
    }

    it('sets the displayName value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Your display name');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));

      expect(displayNameInput).toHaveValue('my-display-name');
    });

    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText('Your username');

      fireEvent.change(usernameInput, changeEvent('my-user-name'));

      expect(usernameInput).toHaveValue('my-user-name');
    });

    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');

      fireEvent.change(passwordInput, changeEvent('P4ssword'));

      expect(passwordInput).toHaveValue('P4ssword');
    });

    it('sets the passwordRepeat value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Repeat your password');

      fireEvent.change(passwordInput, changeEvent('P4ssword'));

      expect(passwordInput).toHaveValue('P4ssword');
    });

    it('calls postSignup when the fields are valid and the actions are provided in props', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      };
      const { container, queryByPlaceholderText } = render(<UserSignupPage actions={actions} />)
      
      const displayNameInput = queryByPlaceholderText('Your display name');
      const usernameInput = queryByPlaceholderText('Your username');
      const passwordInput = queryByPlaceholderText('Your password');
      const passwordRepeatInput = queryByPlaceholderText('Repeat your password');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

      const button = container.querySelector('button');
      fireEvent.click(button);
      
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('it does throw exception when clicking the button when actions not provided in props', () => {
      const { container, queryByPlaceholderText } = render(<UserSignupPage />)
      
      const displayNameInput = queryByPlaceholderText('Your display name');
      const usernameInput = queryByPlaceholderText('Your username');
      const passwordInput = queryByPlaceholderText('Your password');
      const passwordRepeatInput = queryByPlaceholderText('Repeat your password');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

      const button = container.querySelector('button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });
});
