import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from './InputForm';

describe('InputForm', () => {
  it('renders all input fields', () => {
    render(<InputForm onCalculate={() => {}} />);
    
    expect(screen.getByLabelText(/property value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loan amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mortgage term/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly overpayment/i)).toBeInTheDocument();
  });

  it('validates input fields', () => {
    render(<InputForm onCalculate={() => {}} />);
    
    const loanAmountInput = screen.getByLabelText(/loan amount/i);
    fireEvent.change(loanAmountInput, { target: { value: '-1000' } });
    
    expect(screen.getByText(/value must be greater than or equal to 0/i)).toBeInTheDocument();
  });

  it('calls onCalculate with correct values', () => {
    const mockCalculate = vi.fn();
    render(<InputForm onCalculate={mockCalculate} />);
    
    // Fill in all required fields
    fireEvent.change(screen.getByLabelText(/property value/i), { target: { value: '300000' } });
    fireEvent.change(screen.getByLabelText(/loan amount/i), { target: { value: '200000' } });
    fireEvent.change(screen.getByLabelText(/mortgage term/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/interest rate/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/monthly overpayment/i), { target: { value: '200' } });
    
    expect(mockCalculate).toHaveBeenCalledWith({
      propertyValue: '300000',
      loanAmount: '200000',
      mortgageTerm: '25',
      interestRate: '3',
      monthlyOverpayment: '200'
    });
  });
});
