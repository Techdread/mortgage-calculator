import { describe, it, expect } from 'vitest';
import { calculateMortgage, generateRepaymentSchedule } from './calculations';

describe('calculateMortgage', () => {
  it('should calculate monthly payment correctly', () => {
    // Test case: £200,000 loan, 3% interest, 25 years
    const monthlyPayment = calculateMortgage(200000, 3, 25);
    expect(monthlyPayment).toBeCloseTo(948.42, 2);
  });

  it('should handle zero interest rate', () => {
    const monthlyPayment = calculateMortgage(120000, 0, 25);
    expect(monthlyPayment).toBeCloseTo(400, 2); // 120000 / (25 * 12)
  });
});

describe('generateRepaymentSchedule', () => {
  it('should generate correct schedule without overpayment', () => {
    const schedule = generateRepaymentSchedule(200000, 3, 25, 0);
    
    // Check first year
    expect(schedule[0]).toMatchObject({
      year: 1,
      principal: expect.any(Number),
      interest: expect.any(Number),
      balance: expect.any(Number)
    });

    // Total payments should match loan amount plus interest
    const totalPayments = schedule.reduce((sum, year) => 
      sum + year.principal + year.interest, 0);
    expect(totalPayments).toBeCloseTo(200000 * 1.4, 0); // Rough estimate
  });

  it('should reduce term with overpayment', () => {
    const schedule = generateRepaymentSchedule(200000, 3, 25, 200);
    
    // Should complete before 25 years
    expect(schedule.length).toBeLessThan(25);
    
    // Last payment should have zero or near-zero balance
    const lastEntry = schedule[schedule.length - 1];
    expect(lastEntry.balance).toBeLessThan(1);
  });
});
