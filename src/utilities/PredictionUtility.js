import axios from 'axios';

export const predictionUtility = async (income, savings, debt, emi, monthlyEmi, totalAmount) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/predict`, { features: [income, savings, debt, emi, monthlyEmi, totalAmount] });
    const data = response.data;
    console.log(data);
    return Math.round((data.prediction * 100), 2);
}