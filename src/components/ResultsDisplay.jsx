import { Card, CardContent, Typography, Box } from '@mui/material';

const ResultsDisplay = ({ monthlyPayment, totalInterest, totalAmount }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(value);
  };

  return (
    <Card elevation={3} sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Payment
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          {formatCurrency(monthlyPayment)}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Total Interest: {formatCurrency(totalInterest)}
          </Typography>
          <Typography variant="body1">
            Total Amount: {formatCurrency(totalAmount)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
