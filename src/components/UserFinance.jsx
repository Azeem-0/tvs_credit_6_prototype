import { ImCross } from "react-icons/im";
import React, { useContext, useState } from 'react'
import { userFinanceDataContext } from '../contexts/UserFinanceContext';

export default function UserFinance() {

    const { financeData, setFinanceData, setUserFPopUp } = useContext(userFinanceDataContext);

    const handleFormChange = (e) => {
        // set the financeData data of e.target.name to e.target.value
        const { name, value } = e.target;
        setFinanceData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const saveUserFinance = () => {
        if (!financeData.income || !financeData.savings || !financeData.debts || !financeData.emi) {
            console.log("Fill the input fields");
        }
        else {
            console.log(financeData);
            localStorage.setItem('user', JSON.stringify(financeData));
            toggleUserFinance();
        }
    }

    const toggleUserFinance = () => {
        setUserFPopUp((prev) => !prev);
    }

    console.log(JSON.parse(localStorage.getItem('user')));

    return (
        <div className=' relative w-3/4 h-3/4 bg-[#EBF4F1] h-fill flex items-center justify-center flex-col p-2 m-auto rounded-2xl border-2 border-[#bdbdbd]'>
            <ImCross onClick={toggleUserFinance} className="absolute top-10 right-10 cursor-pointer rounded-xl m-2" />
            <h5 className='text-xl m-2 font-bold'>Let us know you!</h5>
            <div className='flex items-center justify-around p-2.5 w-full m-2'>
                <div className='flex flex-col items-center justify-between gap-2 w-2/4 h-2/4'>
                    <div className=" flex flex-row justify-between gap-3">
                        <input name='income' onChange={handleFormChange} type='number' min={0} className='custom-input p-2' placeholder='Monthly Income (in thousands)' required title="Monthly Income (in thousands)" />
                        <input name='savings' onChange={handleFormChange} type='number' min={0} className='custom-input p-2' placeholder='Monthly Savings (in thousands)' required title="Monthly Savings (in thousands)" />
                    </div>
                    <div className=" flex flex-row justify-between gap-3">
                        <input name='debts' onChange={handleFormChange} type='number' min={0} className='custom-input p-2' placeholder='Monthly Debts (in thousands)' required />
                        <input name='emi' onChange={handleFormChange} type='number' min={0} className='custom-input p-2' placeholder='Safe EMI limit (in thousands)' required />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-1/4 h-full'>
                    <div className='w-full flex items-center justify-center flex-col bg-[#8ED693] rounded-3xl text-white p-5 m-2 gap-5'>
                        <div className='w-2/5 object-contain flex items-center justify-center'>
                            <img alt='dp' src='https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1727853816~exp=1727854416~hmac=1c451767fb0e4fd3bca47fb085469f0837f5fa06dd8e35fb072594ebbd3a8b9a' className='rounded-full aspect-square' />
                        </div>
                        <div className='flex items-center justify-center flex-col px-2'>
                            <p className='text-xl font-bold'>Hello User!</p>
                            <p className='text-md w-11/12 text-xs text-center'>Knowing your finances, we can suggest a stress-free loan plan.</p>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-around'>
                        <button onClick={saveUserFinance} className='custom-button min-w-20 p-1 opacity-90'>Save profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
