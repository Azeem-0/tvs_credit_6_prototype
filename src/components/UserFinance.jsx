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
        <div className='w-3/4 h-3/4 bg-green-100 h-fill flex items-center justify-center flex-col p-2 m-auto rounded-2xl'>
            <h5 className='text-xl m-2 font-bold'>Let us know you!</h5>
            <div className='flex items-center justify-around p-2.5 w-full m-2'>
                <div className='flex flex-col items-center justify-between gap-1 w-2/4'>
                    <input name='income' onChange={handleFormChange} type='number' min={0} className='user-data-inputs' placeholder='Monthly Income (in thousands)' required />
                    <input name='savings' onChange={handleFormChange} type='number' min={0} className='user-data-inputs' placeholder='Monthly Savings (in thousands)' required />
                    <input name='debts' onChange={handleFormChange} type='number' min={0} className='user-data-inputs' placeholder='Monthly Debts (in thousands)' required />
                    <input name='emi' onChange={handleFormChange} type='number' min={0} className='user-data-inputs' placeholder='Safe EMI limit (in thousands)' required />
                </div>
                <div className='flex flex-col items-center justify-center w-2/4 '>
                    <div className='w-full flex items-center justify-center flex-col bg-[#8ED693] rounded-2xl text-white p-2 m-2'>
                        <div className='w-1/5 object-contain flex items-center justify-center'>
                            <img alt='dp' src='https://image.nakkheeran.in/cdn/farfuture/WJBIQD3m9vKlGCHBs51FR17tIPaqNPTGqVARA3T7RMc/1639832844/sites/default/files/styles/home_page_360_top_blocks_255x255/public/2021-12-18/kanth.jpg?h=0b378323&itok=mhIXV_ZE' className='rounded-full aspect-square' />
                        </div>
                        <div className='flex items-center justify-center flex-col px-2'>
                            <p className='text-xl font-bold'>Hello RajniKanth!</p>
                            <p className='text-md w-11/12 text-center'>Knowing your finances, we can suggest a stress-free loan plan.</p>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-around'>
                        <button onClick={saveUserFinance} className='custom-button min-w-20'>Save</button>
                        <button onClick={toggleUserFinance} className='custom-button  min-w-20'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
