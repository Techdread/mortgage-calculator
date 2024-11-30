# Mortgage Calculator

A modern, responsive mortgage calculator built with React, Vite, and Material-UI. This application helps users calculate their monthly mortgage payments and visualize their repayment schedule over time.

## Features

- **Interactive Input Form**
  - Property Value
  - Loan Amount
  - Mortgage Term (Years)
  - Interest Rate
  - Real-time validation

- **Detailed Results**
  - Monthly Payment Amount
  - Total Interest
  - Total Amount to be Paid

- **Visual Repayment Schedule**
  - Interactive line graph showing principal vs interest over time
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

1. Enter your property details in the input form:
   - Input the total property value
   - Specify the loan amount you wish to borrow
   - Set the mortgage term in years
   - Enter the annual interest rate

2. The calculator will automatically:
   - Calculate your monthly payments
   - Show the total interest you'll pay
   - Display a graph of your repayment schedule

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
