import React from 'react';
import tvsCreditImage from '../assets/tvs-credit.webp';
import { useNavigate } from 'react-router-dom';


const NavigationBar = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#8ED693] w-screen grid grid-cols-[1.5fr_2fr_1.5fr] p-4 shadow-lg rounded-lg text-sm">
            <img onClick={() => {
                navigate('/');
            }} className="w-[10em] mx-auto cursor-pointer" src={tvsCreditImage} alt="tvs-credit-logo" />

            <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold text-center text-gray-800">TVS Credit Loan Suggestor💰</h2>
            </div>

            <div className="flex justify-center items-center">
                <mark className="bg-white rounded-lg shadow-md p-1">
                    <strong className="text-lg text-gray-800">TEAM NAME: svssathvik77</strong>
                </mark>
            </div>
        </div>
    )
}

export default NavigationBar;