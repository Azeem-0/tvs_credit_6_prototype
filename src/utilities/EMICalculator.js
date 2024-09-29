function EMICalculator(principal,interest,tenure){
    const emi = (principal*interest*tenure)/100;
    const total_interest = emi*tenure;
    const total_amount = Number.parseInt(total_interest) + Number.parseInt(principal);
    console.log(emi,total_interest,total_amount)
    return {
        monthly_emi : emi,
        total_interest : total_interest,
        total_amount : total_amount
    }
}
export default EMICalculator;