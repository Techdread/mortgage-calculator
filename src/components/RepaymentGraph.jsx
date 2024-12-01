import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import EquityPieChart from './EquityPieChart';
import { useState } from 'react';

const RepaymentGraph = ({ data, propertyValue }) => {
  const [selectedYear, setSelectedYear] = useState(0);
  
  // Format data for better visualization
  const formattedData = data.map(item => ({
    ...item,
    year: `Year ${item.year}`,
    principal: Number(item.principal.toFixed(2)),
    interest: Number(item.interest.toFixed(2)),
    balance: Number(item.balance.toFixed(2))
  }));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleMouseMove = (props) => {
    if (props && props.activeTooltipIndex !== undefined) {
      setSelectedYear(props.activeTooltipIndex);
    }
  };

  const currentBalance = selectedYear < formattedData.length 
    ? formattedData[selectedYear].balance 
    : formattedData[formattedData.length - 1].balance;

  return (
    <Card elevation={3} sx={{ mt: 2, minHeight: 400, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Repayment Schedule
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flexGrow: 1, minWidth: 300 }}>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={formattedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                onMouseMove={handleMouseMove}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#8884d8"
                  name="Outstanding Balance"
                />
                <Line
                  type="monotone"
                  dataKey="principal"
                  stroke="#82ca9d"
                  name="Principal Paid"
                />
                <Line
                  type="monotone"
                  dataKey="interest"
                  stroke="#ffc658"
                  name="Interest Paid"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          {propertyValue > 0 && (
            <Box sx={{ width: 300 }}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Property Equity - Year {selectedYear + 1}
              </Typography>
              <EquityPieChart 
                propertyValue={propertyValue} 
                outstandingLoan={currentBalance} 
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RepaymentGraph;
