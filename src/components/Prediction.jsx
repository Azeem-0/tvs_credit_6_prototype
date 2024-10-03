import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
const formatNumber = (number)=>{
    return number.toLocaleString();
}
export default function Prediction(data) {
    const location = useLocation();
    const cards = location.state;
    useEffect(
        () => {
            console.log(location);
        }
        , []);
    return (
        <div className='flex items-center justify-around w-4/5 bg-[#EAF4F0] p-2 rounded-xl overflow-x-scroll'>
            {cards.map((card, i) => (
                <div key={i}>
                    <div className='bg-[#8ED693] w-fit min-w-80 m-2 p-2 rounded-xl items-center justify-center'>
                        <div className='w-fit p-1 flex items-center justify-center flex-col mx-auto shadow-2xl rounded-xl m-4 backdrop-blur-md'>
                            <div className='w-full flex items-center justify-start p-2'>
                                <p className='text-gray-500 mx-2 text-lg'>Loan Amount</p>
                                <>
                                    <p className='font-extrabold text-lg'>₹{formatNumber(card.principal)}</p>
                                    <img alt='principal' src='https://media.lordicon.com/icons/wired/lineal/291-coin-dollar.svg' className='w-6' />
                                </>
                            </div>
                            <div className='w-full flex items-center justify-start p-2'>
                                <p className='text-gray-500 mx-2 text-lg'>Rate of Interest</p>
                                <>
                                    <p className='font-extrabold text-lg'>{card.rate}% </p>
                                    <img alt='principal' src='https://cdn-icons-png.flaticon.com/512/10017/10017583.png' className='w-8' />
                                </>
                            </div>
                            <div className='w-full flex items-center justify-start p-2'>
                                <p className='text-gray-500 mx-2 text-lg'>Tenure</p>
                                <>
                                    <p className='font-extrabold text-lg'>{card.tenure} months </p>
                                    <img alt='principal' src='https://media.lordicon.com/icons/wired/lineal/45-clock-time.svg' className='w-8' />
                                </>
                            </div>
                        </div>
                        <div className='flex items-center justify-around w-full text-white'>
                            <div className='bg-[#167E1B] flex items-center justify-center flex-col p-2 w-fit rounded-xl scale-95'>
                                <p className='text-xs font-medium'>Monthly Loan EMI</p>
                                <p className='text-xl font-bold'>₹{formatNumber(card?.monthly_emi ?? 0)}</p>
                            </div>
                            <div className='bg-[#167E1B] flex items-center justify-center flex-col p-2 w-fit rounded-xl scale-95'>
                                <p className='text-xs font-medium'>Total Amount Payable</p>
                                <p className='text-xl font-bold'>₹{formatNumber(card?.total_amount ?? 0)}</p>
                            </div>
                        </div>
                    </div>
                        <div title={`${card.prediction}%`} className='bg-white w-3/4 h-2 mx-auto rounded-full flex items-center justify-start border-black border-2 cursor-pointer'>
                            <div className={`h-2 my-4 rounded-full bg-[#167E1B]`} style={{ width: `${card.prediction}%` }}></div>
                        </div>
                    </div>
            ))}
        </div>
    )
}
