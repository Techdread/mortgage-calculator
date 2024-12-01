# Mortgage Calculator

A modern, responsive mortgage calculator built with React, Vite, and Material-UI. This application helps users calculate their monthly mortgage payments, visualize their repayment schedule, and understand the impact of overpayments on their mortgage term.

## Features

- **Interactive Input Form**
  - Property Value
  - Loan Amount
  - Mortgage Term (Years)
  - Interest Rate
  - Monthly Overpayment Amount
  - Real-time validation

- **Comprehensive Results Display**
  - Base Monthly Payment
  - Total Monthly Payment (including overpayment)
  - Total Interest
  - Total Amount to be Paid
  - Term Reduction Details
  - Expected Completion Date

- **Visual Repayment Schedules**
  - Side-by-side comparison of standard vs overpayment schedules
  - Interactive line graphs showing:
    - Outstanding Balance
    - Principal Paid
    - Interest Paid
  - Dynamic equity pie charts showing:
    - Property equity vs outstanding loan
    - Updates as you move through the repayment timeline
  - Interest savings calculation
  - Year-by-year breakdown
  - Responsive design

## Technologies Used

- **React** - UI Framework
- **Vite** - Build Tool
- **Material-UI** - Component Library
- **Recharts** - Graphing Library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd mortgage-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter your mortgage details in the input form:
   - Input the total property value
   - Specify the loan amount you wish to borrow
   - Set the mortgage term in years
   - Enter the annual interest rate
   - (Optional) Add a monthly overpayment amount

2. The calculator will automatically:
   - Calculate your monthly payments
   - Show the total interest you'll pay
   - Display your potential savings with overpayments
   - Show how much earlier you could pay off your mortgage
   - Visualize your equity growth over time

3. Interactive Features:
   - Hover over the repayment graphs to see detailed information for each year
   - Compare standard repayment vs overpayment scenarios
   - View dynamic equity breakdown at any point in the mortgage term

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
