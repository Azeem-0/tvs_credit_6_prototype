import React, { useState } from 'react'
import interestRateData from "../constants/LoanTypeConstants.js";

const EmiInterface = () => {

    const [emiInterface, setEmiInterface] = useState({
        monthly_emi: '',
        principal: '',
        total_interest: '',
        total_amount: '',
        rate: '',
        tenure: ''
    });


    const changeInput = (e) => {
        const { name, value } = e.target;
        setEmiInterface((prevValue) => {
            return { ...prevValue, [name]: value };
        });
        console.log(emiInterface);
    }

    console.log(emiInterface);

    return (
        <div className='w-screen h-1/2 flex justify-center items-center'>
            <div className=' w-2/3 h-full bg-[#EAF4F0] flex justify-between gap-2 rounded-2xl'>
                <div className=' ml-6 w-1/4 h-full flex justify-center items-center rounded-tl-2xl rounded-bl-2xl'>
                    <form className='flex flex-col gap-12' action="" onSubmit={null}>
                        <input min={0} name='principal' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Loan Amount' value={emiInterface.principal} />
                        <input min={0} name='rate' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Rate of Interest' value={emiInterface.rate}/>
                        <input min={0} name='tenure' className='custom-input p-2' type="number" onChange={changeInput} placeholder='Tenure (Months)' value={emiInterface.tenure}/>
                    </form>
                </div>
                <div className='flex flex-col justify-center gap-4 w-3/4 p-6 h-full items-center rounded-tr-2xl rounded-br-2xl'>

                    <select className='w-fit text-[0.785em] h-8 translate-x-165 self-end rounded-md bg-transparent outline-none' name="Loan Type" id="Loan Type">
                        {interestRateData.map((type, index) => (
                            <option key={index} value={type[0]}>
                                {type[0]}
                            </option>
                        ))}
                    </select>

                    <div className='bg-[#1BA024] w-full h-60 flex flex-wrap justify-center rounded-2xl p-6'>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface.monthly_emi ? " text-xs " : " text-md "}`}>Monthly Emi</p>
                                {emiInterface.monthly_emi && <p className=' font-bold text-lg'>₹ emiInterface.monthly_emi</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface.principal ? " text-xs " : " text-md "}`}>Prinicpal Amount</p>
                                {emiInterface.principal && <p className=' font-bold text-lg'>₹ {emiInterface.principal}</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface.total_interest ? " text-xs " : " text-md "}`}>Total Interest Payable</p>
                                {emiInterface.total_interest && <p className=' font-bold text-lg'>₹ {emiInterface.total_interest}</p>}
                            </div>
                        </div>
                        <div className='w-1/2 flex justify-center items-center'>
                            <div className=' w-fit h-14 flex justify-center items-center px-4 bg-[#167E1B] min-w-[12em] text-white flex-col rounded-md'>
                                <p className={`${emiInterface.total_amount ? " text-xs " : " text-md "}`}>Total Amount Payable</p>
                                {emiInterface.total_amount && <p className=' font-bold text-lg'>₹ {emiInterface.total_amount}</p>}
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