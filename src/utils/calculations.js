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

export const generateRepaymentSchedule = (loanAmount, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = calculateMortgage(loanAmount, annualRate, years);
  const schedule = [];
  
  let remainingBalance = loanAmount;
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;
  
  for (let month = 1; month <= years * 12; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    yearlyPrincipal += principalPayment;
    yearlyInterest += interestPayment;
    remainingBalance -= principalPayment;
    
    if (month % 12 === 0) {
      schedule.push({
        year: month / 12,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: remainingBalance
      });
      yearlyPrincipal = 0;
      yearlyInterest = 0;
    }
  }
  
  return schedule;
};
