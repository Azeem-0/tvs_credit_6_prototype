function EMICalculator(principal, annualInterestRate, tenure) {
    // Convert annual interest rate to monthly and express as a decimal
    const monthlyInterestRate = (annualInterestRate / 12) / 100;

    // EMI formula
    const emi = Math.round(
        (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / 
        (Math.pow(1 + monthlyInterestRate, tenure) - 1)
    );

    // Total amount to be paid
    const total_amount = emi * tenure;

    // Total interest payable
    const total_interest = total_amount - principal;

    return {
        monthly_emi: emi,
        total_interest: Math.round(total_interest),
        total_amount: Math.round(total_amount)
    };
}

export default EMICalculator;
