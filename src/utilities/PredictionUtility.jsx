import React, { useContext } from 'react'
import { userFinanceDataContext } from '../contexts/UserFinanceContext'
import axios from 'axios';

const PredictionUtility = ({ monthlyEmi, totalAmount }) => {

    const { financeData } = useContext(userFinanceDataContext);

    const { income, savings, debt, emi } = financeData;


    const getPrediction = async () => {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/predict`, { features: [income, savings, debt, emi, monthlyEmi, totalAmount] });
        const data = response.data;
        console.log(data);
    }

    return (
        <></>
    )
}

export default PredictionUtility;