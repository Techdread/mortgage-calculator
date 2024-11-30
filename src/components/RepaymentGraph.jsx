import { Card, CardContent, Typography } from '@mui/material';
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

const RepaymentGraph = ({ data }) => {
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

  return (
    <Card elevation={3} sx={{ mt: 2, minHeight: 400, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Repayment Schedule
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
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
              formatter={(value, name) => [formatCurrency(value), name]}
              labelStyle={{ fontSize: 14 }}
              contentStyle={{ fontSize: 14 }}
            />
            <Legend 
              wrapperStyle={{ fontSize: 14 }}
            />
            <Line
              type="monotone"
              dataKey="principal"
              stroke="#2196f3"
              strokeWidth={2}
              name="Principal"
              dot={{ r: 1 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="interest"
              stroke="#4caf50"
              strokeWidth={2}
              name="Interest"
              dot={{ r: 1 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#ff9800"
              strokeWidth={2}
              name="Remaining Balance"
              dot={{ r: 1 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RepaymentGraph;
