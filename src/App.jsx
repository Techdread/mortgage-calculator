import { useState } from 'react';
import { Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
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

    const schedule = generateRepaymentSchedule(
      Number(loanAmount),
      Number(interestRate),
      Number(mortgageTerm),
      Number(monthlyOverpayment)
    );

    // Find the actual term length after overpayments
    const lastEntry = schedule[schedule.length - 1];
    const actualTermMonths = (lastEntry.year - 1) * 12 + (12 - Math.floor(lastEntry.monthsRemaining));
    const hasOverpayment = Number(monthlyOverpayment) > 0;

    const totalPayments = schedule.reduce((acc, year) => {
      return acc + year.principal + year.interest;
    }, 0);

    setResults({
      monthlyPayment,
      totalMonthlyPayment: monthlyPayment + Number(monthlyOverpayment),
      totalInterest: totalPayments - Number(loanAmount),
      totalAmount: totalPayments,
      schedule,
      originalTerm: Number(mortgageTerm),
      newTermMonths: hasOverpayment ? actualTermMonths : Number(mortgageTerm) * 12,
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
            <ResultsDisplay {...results} />
            <RepaymentGraph 
              data={results.schedule} 
              propertyValue={results.propertyValue}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
