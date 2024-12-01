import { useState } from 'react';
import { Container, CssBaseline, createTheme, ThemeProvider, Grid, Typography } from '@mui/material';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import RepaymentGraph from './components/RepaymentGraph';
import { calculateMortgage, generateRepaymentSchedule } from './utils/calculations';

const theme = createTheme();

function App() {
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalMonthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    schedule: [],
    scheduleWithoutOverpayment: [],
    originalTerm: 0,
    newTermMonths: 0,
    propertyValue: 0,
    loanAmount: 0
  });

  const handleCalculate = (formData) => {
    const { loanAmount, interestRate, mortgageTerm, monthlyOverpayment, propertyValue } = formData;
    const monthlyPayment = calculateMortgage(
      Number(loanAmount),
      Number(interestRate),
      Number(mortgageTerm)
    );

    // Generate schedule with overpayment
    const scheduleWithOverpayment = generateRepaymentSchedule(
      Number(loanAmount),
      Number(interestRate),
      Number(mortgageTerm),
      Number(monthlyOverpayment)
    );

    // Generate schedule without overpayment
    const scheduleWithoutOverpayment = generateRepaymentSchedule(
      Number(loanAmount),
      Number(interestRate),
      Number(mortgageTerm),
      0
    );

    // Find the actual term length after overpayments
    const lastEntry = scheduleWithOverpayment[scheduleWithOverpayment.length - 1];
    const actualTermMonths = (lastEntry.year - 1) * 12 + (12 - Math.floor(lastEntry.monthsRemaining));
    const hasOverpayment = Number(monthlyOverpayment) > 0;

    // Calculate total payments for schedule with overpayment
    const totalPayments = scheduleWithOverpayment.reduce((acc, year) => {
      return acc + year.principal + year.interest;
    }, 0);

    // Calculate total payments for schedule without overpayment
    const totalPaymentsWithoutOverpayment = scheduleWithoutOverpayment.reduce((acc, year) => {
      return acc + year.principal + year.interest;
    }, 0);

    setResults({
      monthlyPayment,
      totalMonthlyPayment: monthlyPayment + Number(monthlyOverpayment),
      totalInterest: totalPayments - Number(loanAmount),
      totalInterestWithoutOverpayment: totalPaymentsWithoutOverpayment - Number(loanAmount),
      totalAmount: totalPayments,
      totalAmountWithoutOverpayment: totalPaymentsWithoutOverpayment,
      schedule: scheduleWithOverpayment,
      scheduleWithoutOverpayment,
      originalTerm: Number(mortgageTerm),
      newTermMonths: actualTermMonths,
      propertyValue: Number(propertyValue),
      loanAmount: Number(loanAmount)
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <InputForm onCalculate={handleCalculate} />
        {results.monthlyPayment > 0 && (
          <>
            <ResultsDisplay 
              {...results} 
              totalInterest={results.totalInterest}
              totalAmount={results.totalAmount}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Repayment Schedules Comparison
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Without Overpayment
                  {results.totalInterestWithoutOverpayment > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Total Interest: {new Intl.NumberFormat('en-GB', {
                        style: 'currency',
                        currency: 'GBP'
                      }).format(results.totalInterestWithoutOverpayment)}
                    </Typography>
                  )}
                </Typography>
                <RepaymentGraph 
                  data={results.scheduleWithoutOverpayment}
                  propertyValue={results.propertyValue}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  With Overpayment
                  {results.totalInterest > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Total Interest: {new Intl.NumberFormat('en-GB', {
                        style: 'currency',
                        currency: 'GBP'
                      }).format(results.totalInterest)}
                      {results.totalInterestWithoutOverpayment > results.totalInterest && (
                        <span style={{ color: '#4caf50', marginLeft: '8px' }}>
                          (Save {new Intl.NumberFormat('en-GB', {
                            style: 'currency',
                            currency: 'GBP'
                          }).format(results.totalInterestWithoutOverpayment - results.totalInterest)})
                        </span>
                      )}
                    </Typography>
                  )}
                </Typography>
                <RepaymentGraph 
                  data={results.schedule}
                  propertyValue={results.propertyValue}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
