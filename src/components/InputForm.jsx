import { useState } from 'react';
import { Box, TextField, Card, CardContent, Typography } from '@mui/material';

const InputForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    propertyValue: '',
    loanAmount: '',
    mortgageTerm: '',
    interestRate: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (value === '') return 'This field is required';
    if (value <= 0) return 'Value must be greater than 0';
    if (name === 'mortgageTerm' && !Number.isInteger(Number(value))) {
      return 'Must be a whole number';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));

    // Calculate only if all fields are valid
    const newData = { ...formData, [name]: value };
    if (Object.values(newData).every(val => val !== '') && Object.values(errors).every(err => !err)) {
      onCalculate(newData);
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Mortgage Calculator
        </Typography>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <div>
            <TextField
              label="Property Value"
              name="propertyValue"
              type="number"
              value={formData.propertyValue}
              onChange={handleChange}
              error={!!errors.propertyValue}
              helperText={errors.propertyValue}
              InputProps={{ startAdornment: '£' }}
            />
            <TextField
              label="Loan Amount"
              name="loanAmount"
              type="number"
              value={formData.loanAmount}
              onChange={handleChange}
              error={!!errors.loanAmount}
              helperText={errors.loanAmount}
              InputProps={{ startAdornment: '£' }}
            />
          </div>
          <div>
            <TextField
              label="Mortgage Term (Years)"
              name="mortgageTerm"
              type="number"
              value={formData.mortgageTerm}
              onChange={handleChange}
              error={!!errors.mortgageTerm}
              helperText={errors.mortgageTerm}
            />
            <TextField
              label="Interest Rate (%)"
              name="interestRate"
              type="number"
              value={formData.interestRate}
              onChange={handleChange}
              error={!!errors.interestRate}
              helperText={errors.interestRate}
              InputProps={{ endAdornment: '%' }}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InputForm;
