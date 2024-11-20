import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from './App';

describe('DynamicForm', () => {
  test('renders the form with initial fields', () => {
    render(<DynamicForm />);

    // Check if initial option is present
    const selectElement = screen.getByLabelText(/Choose an option:/i);
    expect(selectElement).toBeInTheDocument();

    // Ensure extra fields are not displayed initially
    const extraInput = screen.queryByLabelText(/Additional Info:/i);
    expect(extraInput).toBeNull();
  });

  test('displays extra fields when "Show extra fields" is selected', () => {
    render(<DynamicForm />);

    // Select "Show extra fields"
    fireEvent.change(screen.getByLabelText(/Choose an option:/i), {
      target: { value: 'showFields' },
    });

    // Check if extra input field is shown
    const extraInput = screen.getByLabelText(/Additional Info:/i);
    expect(extraInput).toBeInTheDocument();
  });

  test('submits form with correct data', () => {
    render(<DynamicForm />);

    // Change option to show extra fields
    fireEvent.change(screen.getByLabelText(/Choose an option:/i), {
      target: { value: 'showFields' },
    });

    // Type in the extra input field
    const extraInput = screen.getByLabelText(/Additional Info:/i);
    fireEvent.change(extraInput, { target: { value: 'Some additional info' } });

    // Submit form (you can mock the console.log or submission behavior)
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // You could mock `console.log` or use a mock API request here.
    expect(console.log).toHaveBeenCalledWith({
      userChoice: 'showFields',
      extraInput: 'Some additional info',
    });
  });
});
