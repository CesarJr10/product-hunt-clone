import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../../shared/context/authContext'; // Actualiza la ruta según sea necesario
import Login from './login';
import { LoginUser } from '../services/loginUser';

// Mock LoginUser module
jest.mock('../services/loginUser');

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('should render login form correctly', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    // Check if the email input is present
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    // Check if the password input is present
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    // Check if the login button is present
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('should update input values correctly', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password');
  });

  test('should display error message on failed login attempt', async () => {
    // Mock LoginUser to reject with an error
    const mockLoginUser = LoginUser as jest.MockedFunction<typeof LoginUser>;
    mockLoginUser.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Verify if the error message is displayed
    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  test('should call authLogin with correct arguments on successful login', async () => {
    // Create a mock login function with a successful response
    const mockLoginUser = LoginUser as jest.MockedFunction<typeof LoginUser>;
    const mockTokenData = { token: 'fakeToken', id: 'userId', name: 'John Doe' };
    mockLoginUser.mockResolvedValueOnce(mockTokenData);

    // Mock the `authLogin` function and track calls to it
    const authLoginSpy = jest.fn();
    jest.spyOn(require('../../../shared/context/authContext'), 'useAuth').mockReturnValue({ login: authLoginSpy });

    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Verify that authLogin was called with the correct arguments
    await expect(authLoginSpy).toHaveBeenCalledWith(mockTokenData);

    // Additionally verify navigation or other login effects if necessary
  });
});