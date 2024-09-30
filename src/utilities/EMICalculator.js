function EMICalculator(principal,interest,tenure){
    const emi = Math.round((principal*interest*tenure)/100,3);
    const total_interest = Math.round(emi*tenure,3);
    const total_amount = Math.round(Number.parseInt(total_interest) + Number.parseInt(principal),3);
    return {
        monthly_emi : emi,
        total_interest : total_interest,
        total_amount : total_amount
    }
}
export default EMICalculator;