export const calculateMortgage = (loanAmount, annualRate, years) => {
  // Handle zero interest rate case
  if (annualRate === 0) {
    return loanAmount / (years * 12);
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return Number(monthlyPayment.toFixed(2));
};

export const calculatePaymentTermMonths = (loanAmount, annualRate, monthlyPayment) => {
  // Handle zero or invalid interest rate
  if (annualRate <= 0) {
    return Math.ceil(loanAmount / monthlyPayment);
  }

  const monthlyRate = annualRate / 100 / 12;
  
  // Use the formula: n = -log(1 - (r * P)/PMT) / log(1 + r)
  // where n = number of payments, r = monthly rate, P = principal, PMT = monthly payment
  const n = -Math.log(1 - (monthlyRate * loanAmount) / monthlyPayment) / Math.log(1 + monthlyRate);
  
  // Round up to nearest month
  return Math.ceil(n);
};

export const generateRepaymentSchedule = (loanAmount, annualRate, years, monthlyOverpayment = 0) => {
  // Handle zero interest rate
  if (annualRate === 0) {
    const monthlyPayment = loanAmount / (years * 12);
    const schedule = [];
    let remainingBalance = loanAmount;
    
    for (let year = 1; year <= years; year++) {
      const yearlyPayment = year === years ? remainingBalance : monthlyPayment * 12;
      schedule.push({
        year,
        principal: Number(yearlyPayment.toFixed(2)),
        interest: 0,
        balance: year === years ? 0 : remainingBalance - yearlyPayment,
        monthsRemaining: (years - year + 1) * 12
      });
      remainingBalance -= yearlyPayment;
    }
    return schedule;
  }

  const monthlyRate = annualRate / 100 / 12;
  const baseMonthlyPayment = calculateMortgage(loanAmount, annualRate, years);
  const totalMonthlyPayment = baseMonthlyPayment + monthlyOverpayment;
  
  // Calculate actual number of months needed with overpayment
  const actualMonthsNeeded = calculatePaymentTermMonths(loanAmount, annualRate, totalMonthlyPayment);
  
  const schedule = [];
  let remainingBalance = loanAmount;
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;
  let currentYear = 1;
  let monthsRemaining = actualMonthsNeeded;

  while (remainingBalance > 0 && currentYear <= years) {
    yearlyPrincipal = 0;
    yearlyInterest = 0;
    
    for (let month = 1; month <= 12 && remainingBalance > 0; month++) {
      // Calculate this month's interest
      const interestPayment = Number((remainingBalance * monthlyRate).toFixed(2));
      
      // Calculate principal payment including overpayment
      let principalPayment = totalMonthlyPayment - interestPayment;
      
      // Adjust for final payment
      if (remainingBalance < principalPayment) {
        principalPayment = remainingBalance;
      }
      
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      remainingBalance = Math.max(0, Number((remainingBalance - principalPayment).toFixed(2)));
      monthsRemaining--;
    }
    
    schedule.push({
      year: currentYear,
      principal: Number(yearlyPrincipal.toFixed(2)),
      interest: Number(yearlyInterest.toFixed(2)),
      balance: Number(remainingBalance.toFixed(2)),
      monthsRemaining
    });
    
    currentYear++;
    if (remainingBalance === 0) break;
  }
  
  return schedule;
}
