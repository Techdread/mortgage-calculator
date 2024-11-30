import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the RepaymentGraph component
vi.mock('./components/RepaymentGraph', () => ({
  default: ({ data }) => (
    <div data-testid="mock-repayment-graph">
      Mock Graph (Data points: {data.length})
    </div>
  )
}));

describe('App Integration', () => {
  it('calculates mortgage and displays results', async () => {
    render(<App />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/property value/i), { target: { value: '300000', name: 'propertyValue' } });
    fireEvent.change(screen.getByLabelText(/loan amount/i), { target: { value: '200000', name: 'loanAmount' } });
    fireEvent.change(screen.getByLabelText(/mortgage term/i), { target: { value: '25', name: 'mortgageTerm' } });
    fireEvent.change(screen.getByLabelText(/interest rate/i), { target: { value: '3', name: 'interestRate' } });
    
    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText(/base monthly payment/i)).toBeInTheDocument();
    });

    // Check if results are displayed
    expect(screen.getByText(/total interest/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-repayment-graph')).toBeInTheDocument();
  });

  it('shows overpayment results when overpayment is added', async () => {
    render(<App />);
    
    // Fill in the form with overpayment
    fireEvent.change(screen.getByLabelText(/property value/i), { target: { value: '300000', name: 'propertyValue' } });
    fireEvent.change(screen.getByLabelText(/loan amount/i), { target: { value: '200000', name: 'loanAmount' } });
    fireEvent.change(screen.getByLabelText(/mortgage term/i), { target: { value: '25', name: 'mortgageTerm' } });
    fireEvent.change(screen.getByLabelText(/interest rate/i), { target: { value: '3', name: 'interestRate' } });
    fireEvent.change(screen.getByLabelText(/monthly overpayment/i), { target: { value: '200', name: 'monthlyOverpayment' } });
    
    // Wait for overpayment results
    await waitFor(() => {
      expect(screen.getByText(/total monthly payment/i)).toBeInTheDocument();
    });

    // Check for overpayment-specific elements
    expect(screen.getByText(/early repayment details/i)).toBeInTheDocument();
    expect(screen.getByText(/term reduced by/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-repayment-graph')).toBeInTheDocument();
  });
});
