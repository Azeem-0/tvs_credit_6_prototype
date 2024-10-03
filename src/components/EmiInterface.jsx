import React, { useContext, useEffect, useState } from 'react'
import interestRateData from "../constants/LoanTypeConstants.js";
import EMICalculator from '../utilities/EMICalculator.js';
import UserFinance from "./UserFinance.jsx";
import { userFinanceDataContext } from '../contexts/UserFinanceContext.jsx';
import { useNavigate } from 'react-router-dom';
import { predictionUtility } from '../utilities/PredictionUtility.js';
const EmiInterface = () => {
    const [emiInterface, setEmiInterface] = useState([{
        monthly_emi: '',
        principal: '',
        total_interest: '',
        total_amount: '',
        rate: '',
        tenure: '',
        loan_details: null,
        prediction: 0
    }]);
    const { financeData } = useContext(userFinanceDataContext);
    const { income, savings, debts, emi } = financeData;

    const { userFPopUp, setUserFPopUp } = useContext(userFinanceDataContext);

    const [currCard, setCurrCard] = useState(0);

    const changeInput = (e) => {
        const { name, value } = e.target;
        setEmiInterface((prevValue) => {
            const updatedEmiInterface = [...prevValue];
            updatedEmiInterface[currCard] = { ...updatedEmiInterface[currCard], [name]: value };
            return updatedEmiInterface;
        });
    }

    const chooseLoanType = (e) => {
        const { value } = e.target;

        setEmiInterface((prevValue) => {
            const updatedEmiInterface = [...prevValue];
            updatedEmiInterface[currCard] = { ...updatedEmiInterface[currCard], loan_details: interestRateData[value] };
            return updatedEmiInterface;
        });
    }

    const addNewComparision = async () => {
        const pred = await predictionUtility(parseInt(income), parseInt(savings), parseInt(debts), parseInt(emi), parseInt(emiInterface[currCard].monthly_emi), parseInt(emiInterface[currCard].total_amount));

        setEmiInterface((prevArray) => {

            const updatedEmiInterface = prevArray.map((item, index) =>
                index === currCard
                    ? { ...item, prediction: pred }
                    : item
            );

            updatedEmiInterface.push({
                monthly_emi: '',
                principal: '',
                total_interest: '',
                total_amount: '',
                rate: '',
                tenure: '',
                loan_details: null,
                prediction: 0
            });

            return updatedEmiInterface;

        });

        setCurrCard((currCard) => currCard + 1);
        const dropDown = document.getElementById("loan-type");
        dropDown.selectedIndex = 0;
    }

    const setRateUtility = () => {
        let roi;
        const currentCard = emiInterface[currCard];
        if (currentCard.tenure < 6) {
            roi = currentCard.loan_details[1];
        } else if (currentCard.tenure >= 6 && currentCard.tenure <= 12) {
            roi = currentCard.loan_details[2];
        } else {
            roi = currentCard.loan_details[3];
        }

        setEmiInterface((prevArray) => {
            return prevArray.map((item, index) =>
                index === currCard
                    ? { ...item, rate: roi }
                    : item
            );
        });
    }

    const navigate = useNavigate();
    const handlePredict = () => {

        setEmiInterface((prevData) => {
            const stateCopy = [...prevData];
            stateCopy.pop();
            setCurrCard(currCard - 1);
            navigate("/predict", { state: stateCopy });
            return stateCopy;
        });

        localStorage.removeItem('user');
    }

    useEffect(() => {
        const { principal, rate, tenure } = emiInterface[currCard];
        if (principal && rate && tenure) {
            const { monthly_emi, total_interest, total_amount } = EMICalculator(
                Number.parseInt(principal),
                Number.parseFloat(rate),
                Number.parseInt(tenure)
            );
            setEmiInterface((prevData) => {
                const updatedEmiInterface = [...prevData];
                updatedEmiInterface[currCard] = {
                    ...updatedEmiInterface[currCard],
                    monthly_emi: monthly_emi,
                    total_interest: total_interest,
                    total_amount: total_amount
                };
                return updatedEmiInterface;
            });
        }
    }, [emiInterface[currCard].principal, emiInterface[currCard].rate, emiInterface[currCard].tenure]);

    // console.log(!localStorage.getItem('user'));

    useEffect(() => {
        if (emiInterface[currCard].tenure && emiInterface[currCard].loan_details) {
            setRateUtility();
        }
    }, [emiInterface[currCard].tenure, emiInterface[currCard].loan_details]);

    // useEffect(() => {
    //     const dialogBox = document.getElementById('user-finance-dialog');
    //     if (userFPopUp) {
    //         dialogBox.showModal();
    //     }
    //     else {
    //         dialogBox.close();
    //     }
    // }, [userFPopUp]);

    return (
        <div className='w-screen h-1/2 flex justify-center items-center'>

            {/* trying to do the same with dialog box let's see */}

            {/* <dialog id='user-finance-dialog' className='bg-white'>
                <UserFinance />
            </dialog> */}

            {userFPopUp && <div className='flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-3/4 z-10 rounded-md'>
                <UserFinance />
            </div>}

            <div className=' w-2/3 h-full bg-[#EAF4F0] flex justify-between rounded-2xl'>
                {currCard > 0 && <p className='top-0 bg-[#167E1B] w-8 h-8 flex items-center justify-center rounded-full font-extrabold text-white'>{currCard}</p>}
                <div className='w-1/4 h-full flex justify-center items-center m-2 p-2'>
                    <form className='flex flex-col w-full'>
                        <input min={1} max={1000000} name='principal' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Loan Amount (in rupees)' value={emiInterface[currCard].principal} />
                        <input min={1} max={100} name='rate' className='custom-input p-2 read-only-input' type="number" onChange={changeInput} placeholder='Rate of Interest (%)' value={emiInterface[currCard].rate} disabled />
                        <input min={1} max={120} name='tenure' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Tenure (Months)' value={emiInterface[currCard].tenure} />
                    </form>
                </div>
                <div className='flex flex-col justify-center w-3/4 p-6 h-full items-center rounded-tr-2xl rounded-br-2xl'>
                    <select className='w-fit text-sm h-8 self-end rounded-md bg-transparent outline-none m-0' name="Loan Type" id="loan-type" onChange={chooseLoanType}>
                        {interestRateData.map((type, index) => (
                            <option key={index} value={index}>
                                {type[0]}
                            </option>
                        ))}
                    </select>
                    <div className='bg-[#1BA024] w-full h-60 flex flex-wrap justify-center rounded-2xl p-6'>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface[currCard].monthly_emi ? " text-xs " : " text-md "}`}>Monthly Emi</p>
                                {emiInterface[currCard].monthly_emi && <p className=' font-bold text-lg'>₹ {emiInterface[currCard].monthly_emi}</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface[currCard].principal ? " text-xs " : " text-md "}`}>Principal Amount</p>
                                {emiInterface[currCard].principal && <p className=' font-bold text-lg'>₹ {emiInterface[currCard].principal}</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface[currCard].total_interest ? " text-xs " : " text-md "}`}>Total Interest Payable</p>
                                {emiInterface[currCard].total_interest && <p className=' font-bold text-lg'>₹ {emiInterface[currCard].total_interest}</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface[currCard].total_amount ? " text-xs " : " text-md "}`}>Total Amount Payable</p>
                                {emiInterface[currCard].total_amount && <p className=' font-bold text-lg'>₹ {emiInterface[currCard].total_amount}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <button onClick={addNewComparision} className={`${(emiInterface[currCard].principal && emiInterface[currCard].rate && emiInterface[currCard].tenure && localStorage.getItem('user')) ? " opacity-100 " : " opacity-50 cursor-not-allowed"} custom-button`} title={`${(!(emiInterface[currCard].principal && emiInterface[currCard].rate && emiInterface[currCard].tenure) || !localStorage.getItem('user')) ? 'please fill user finance details' : ''}`} disabled={(!(emiInterface[currCard].principal && emiInterface[currCard].rate && emiInterface[currCard].tenure)) || !localStorage.getItem('user')}>Compare To</button>
                        <button onClick={handlePredict} className={`${currCard >= 1 ? " block " : " hidden "} custom-button ${financeData.income && financeData.savings && financeData.debts && financeData.emi ? " opacity-100 " : " opacity-50 cursor-not-allowed "}`}>Predict</button>
                        <button onClick={() => {
                            setUserFPopUp((prev) => (
                                !prev
                            ));
                        }} className='custom-button'>Add Personal Data</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmiInterface;