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
  return (
    <Card elevation={3} sx={{ mt: 2, height: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Repayment Schedule
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip 
              formatter={(value) => new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP'
              }).format(value)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="principal"
              stroke="#8884d8"
              name="Principal"
            />
            <Line
              type="monotone"
              dataKey="interest"
              stroke="#82ca9d"
              name="Interest"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RepaymentGraph;
