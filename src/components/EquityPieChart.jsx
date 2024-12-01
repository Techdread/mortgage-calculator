import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const EquityPieChart = ({ propertyValue, outstandingLoan }) => {
  const equity = propertyValue - outstandingLoan;
  
  const data = [
    { name: 'Equity', value: equity },
    { name: 'Outstanding Loan', value: outstandingLoan }
  ];

  const COLORS = ['#4caf50', '#f44336']; // Green for equity, Red for loan

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP'
            }).format(value)}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityPieChart;
