import { Card, CardContent, Box } from '@mui/material';
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
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ width: '66.67%', minWidth: 150, height: 250 }}>
            <ResponsiveContainer>
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
                  interval={1}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 10 }}
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
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="principal"
                  stroke="#82ca9d"
                  name="Principal Paid"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="interest"
                  stroke="#ffc658"
                  name="Interest Paid"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          {propertyValue > 0 && (
            <Box sx={{ width: '100%', maxWidth: 200, alignSelf: 'center' }}>
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
