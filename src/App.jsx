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
    totalInterest: 0,
    totalAmount: 0,
    schedule: []
  });

  const handleCalculate = (formData) => {
    const { loanAmount, interestRate, mortgageTerm } = formData;
    const monthlyPayment = calculateMortgage(
      Number(loanAmount),
      Number(interestRate),
      Number(mortgageTerm)
    );

    const schedule = generateRepaymentSchedule(
      Number(loanAmount),
      Number(interestRate),
      Number(mortgageTerm)
    );

    const totalAmount = monthlyPayment * Number(mortgageTerm) * 12;
    const totalInterest = totalAmount - Number(loanAmount);

    setResults({
      monthlyPayment,
      totalInterest,
      totalAmount,
      schedule
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <InputForm onCalculate={handleCalculate} />
        {results.monthlyPayment > 0 && (
          <>
            <ResultsDisplay
              monthlyPayment={results.monthlyPayment}
              totalInterest={results.totalInterest}
              totalAmount={results.totalAmount}
            />
            <RepaymentGraph data={results.schedule} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
