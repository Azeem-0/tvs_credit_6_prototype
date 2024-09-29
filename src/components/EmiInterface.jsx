import React, { useState } from 'react'
import { loanTypes } from '../constants/LoanTypeConstants';

const EmiInterface = () => {

    const [emiInterface, setEmiInterface] = useState({
        monthly_emi: null,
        principal: null,
        total_interest: null,
        total_amount: null,
        rate: null,
        tenure: null
    });


    const changeInput = (e) => {
        const { name, value } = e.target;

        setEmiInterface((prevValue) => {
            return { ...prevValue, [name]: value };
        });
    }

    console.log(emiInterface);

    return (
        <div className='w-screen h-1/2 flex justify-center items-center'>
            <div className=' w-2/3 h-full bg-[#8bd4a9] flex justify-between gap-2 rounded-2xl'>
                <div className=' ml-6 w-1/4 h-full flex justify-center items-center bg-[#8bd4a9] rounded-tl-2xl rounded-bl-2xl'>
                    <form className='flex flex-col gap-12' action="" onSubmit={null}>
                        <input name='principal' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Loan Amount' />
                        <input name='rate' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Rate of Interest' />
                        <input name='tenure' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Tenure (Months)' />
                    </form>
                </div>
                <div className='flex flex-col justify-center gap-4 w-3/4 p-6 h-full bg-[#8bd4a9] items-center rounded-tr-2xl rounded-br-2xl'>

                    <select className='w-fit text-[0.785em] h-8 translate-x-165 self-end rounded-md bg-transparent outline-none' name="Loan Type" id="Loan Type">
                        {loanTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <div className='bg-[#108A43] w-full h-60 flex flex-wrap justify-around rounded-2xl'>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#0E7E3C] min-w-[12em] text-white flex-col'>
                                <p>Monthly Emi</p>
                                {emiInterface.monthly_emi && <p className=' font-bold'>₹ emiInterface.monthly_emi</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#0E7E3C] min-w-[12em] text-white flex-col'>
                                <p>Prinicpal Amount</p>
                                {emiInterface.principal && <p className=' font-bold'>₹ {emiInterface.principal}</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#0E7E3C] min-w-[12em] text-white flex-col'>
                                <p>Total Intrest Payable</p>
                                {emiInterface.total_interest && <p className=' font-bold'>₹ {emiInterface.total_interest}</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#0E7E3C] min-w-[12em] text-white flex-col'>
                                <p>Total Amount Payable</p>
                                {emiInterface.total_amount && <p className=' font-bold'>₹ {emiInterface.total_amount}</p>}
                            </div>
                        </div>
                    </div>
                    <button className='p-2 text-center text-xs bg-black text-white rounded-md'>Compare To</button>
                </div>
            </div>
        </div>
    )
}

export default EmiInterface