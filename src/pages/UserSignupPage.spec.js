import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
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

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300)
        });
      });
    }

    // variables for fields
    let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;

    const setupForSubmit = (props) => {
      // returns reference to rendered component
      // fills in and clicks submit button
      // passes actions prop to UserSignPage if any
      const rendered = render(<UserSignupPage {...props} />)
    
      const { container, queryByPlaceholderText } = rendered;
    
      displayNameInput = queryByPlaceholderText('Your display name');
      usernameInput = queryByPlaceholderText('Your username');
      passwordInput = queryByPlaceholderText('Your password');
      passwordRepeatInput = queryByPlaceholderText('Repeat your password');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

      button = container.querySelector('button');

      return rendered;
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
      // mock
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      };
      
      setupForSubmit({ actions });
      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('it does not throw exception when clicking the button when actions not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('calls post with user body when the files are valid', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const expectedUserObjbect = {
        username: 'my-user-name',
        displayName: 'my-display-name',
        password: 'P4ssword'
      };

      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObjbect);
    });

    it('does not allow use to click the signup button when there is an ongoing api call', () => {
      // now we have to make our mock function return response with delay
      // we will return a promise because our actual axios call returns a promise
      const actions = {
        postSignup: mockAsyncDelayed()
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('displays spinner when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      };

      const { queryByRole } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByRole('status')
      expect(spinner).toBeInTheDocument();
    });

    it('hides spinner after api call finishes successfully', async () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      };

      const { queryByRole } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByRole('status')
      await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
      });
      
    });

    it('hides spinner after api call finishes with error', async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({
                response: { data: {} }
              });
            }, 300)
          });
        })
      };
      
      const { queryByRole } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByRole('status')
      await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
      });
      
    });
  });
});

console.error = () => { };