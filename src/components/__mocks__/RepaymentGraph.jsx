import { Card, CardContent, Typography } from '@mui/material';

const RepaymentGraph = ({ data }) => {
  return (
    <Card elevation={3} sx={{ mt: 2, minHeight: 400, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Repayment Schedule
        </Typography>
        <div data-testid="mock-repayment-graph">
          {/* Mock content for testing */}
          <div>Number of data points: {data.length}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepaymentGraph;
