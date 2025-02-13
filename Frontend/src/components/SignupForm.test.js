import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
  }));
  

// Mocking...
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe('SignupForm Component', () => {
  test('1. Renders the Signup form', () => {
    renderWithRouter(<SignupForm />);
    expect(screen.getByText('Sign Up',{exact:false})).toBeInTheDocument();
  });

  test('2. Validates that passwords match', () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Confirm Password'));
  });

  test('3. Submits the form with valid data', async () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Email'));
    fireEvent.change(screen.getByLabelText('Password'));
    fireEvent.change(screen.getByLabelText('Confirm Password'));
  
  });

  test('4. Handles API error on signup', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 409,
        json: () => Promise.resolve({ error: 'Email already in use' }),
      })
    );
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByText('Email already in use')).toBeInTheDocument();
  });

  test('5. Navigates to login page on successful signup', async () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    await waitFor(() => expect(window.location.pathname).toBe('/login'));
  });

  test('6. Validates email field is required', async () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByText('Please fill out this field.')).toBeInTheDocument();
  });

  test('7. Validates password field is required', async () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByText('Please fill out this field.')).toBeInTheDocument();
  });

  test('8. Validates confirm password field is required', async () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByText('Please fill out this field.')).toBeInTheDocument();
  });

  test('9. Validates password length is between 3 and 15 characters', async () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByText('Please lengthen this text to 3 characters or more')).toBeInTheDocument();
  });

  test('10. Validates email format', async () => {
    renderWithRouter(<SignupForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });
});