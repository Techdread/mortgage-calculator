export const calculateMortgage = (loanAmount, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const monthlyPayment =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return monthlyPayment;
};

export const generateRepaymentSchedule = (loanAmount, annualRate, years, monthlyOverpayment = 0) => {
  const monthlyRate = annualRate / 100 / 12;
  const baseMonthlyPayment = calculateMortgage(loanAmount, annualRate, years);
  const schedule = [];
  
  let remainingBalance = loanAmount;
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;
  let currentYear = 1;
  let monthsRemaining = years * 12;
  
  for (let month = 1; month <= years * 12; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    let principalPayment = baseMonthlyPayment - interestPayment;
    
    // Add overpayment
    if (remainingBalance > principalPayment + monthlyOverpayment) {
      principalPayment += Number(monthlyOverpayment);
    } else if (remainingBalance > principalPayment) {
      principalPayment = remainingBalance;
    }
    
    yearlyPrincipal += principalPayment;
    yearlyInterest += interestPayment;
    remainingBalance -= principalPayment;
    
    if (month % 12 === 0 || remainingBalance <= 0) {
      schedule.push({
        year: currentYear,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(0, remainingBalance),
        monthsRemaining: monthsRemaining
      });
      yearlyPrincipal = 0;
      yearlyInterest = 0;
      currentYear++;
    }
    
    monthsRemaining--;
    
    if (remainingBalance <= 0) {
      break;
    }
  }
  
  return schedule;
};
