import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

const ResultsDisplay = ({ 
  monthlyPayment, 
  totalMonthlyPayment, 
  totalInterest, 
  totalAmount, 
  originalTerm, 
  newTermMonths
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(value);
  };

  const formatTermDuration = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years and ${remainingMonths} months`;
  };

  const calculateTermReduction = () => {
    if (!newTermMonths || newTermMonths >= originalTerm * 12) return null;
    
    const originalMonths = originalTerm * 12;
    const monthsSaved = Math.min(originalMonths - newTermMonths, originalMonths);
    
    // If monthly payment (including overpayment) is less than required, no term reduction is possible
    if (totalMonthlyPayment < monthlyPayment) return null;
    
    return {
      termSaved: formatTermDuration(monthsSaved),
      newTerm: formatTermDuration(newTermMonths),
      endDate: new Date(Date.now() + (newTermMonths * 30.44 * 24 * 60 * 60 * 1000)) 
        .toLocaleDateString('en-GB', { 
          month: 'long',
          year: 'numeric'
        })
    };
  };

  const termReduction = calculateTermReduction();
  const hasOverpayment = totalMonthlyPayment > monthlyPayment;

  return (
    <Card elevation={3} sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
          <div>
            <Typography variant="h6" gutterBottom>
              Base Monthly Payment
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              {formatCurrency(monthlyPayment)}
            </Typography>
          </div>
          {hasOverpayment && (
            <div>
              <Typography variant="h6" gutterBottom>
                Total Monthly Payment
              </Typography>
              <Typography variant="h4" color="success.main" gutterBottom>
                {formatCurrency(totalMonthlyPayment)}
              </Typography>
            </div>
          )}
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Total Interest: {formatCurrency(totalInterest)}
          </Typography>
          <Typography variant="body1">
            Total Amount: {formatCurrency(totalAmount)}
          </Typography>
          <Typography variant="body1">
            Original Term: {formatTermDuration(originalTerm * 12)}
          </Typography>
        </Box>

        {termReduction && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Early Repayment Details
            </Typography>
            <Typography variant="body1" color="success.main">
              Mortgage will be paid off by: {termReduction.endDate}
            </Typography>
            <Typography variant="body1" color="success.main">
              New mortgage term: {termReduction.newTerm}
            </Typography>
            <Typography variant="body1" color="success.main">
              Term reduced by: {termReduction.termSaved}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
