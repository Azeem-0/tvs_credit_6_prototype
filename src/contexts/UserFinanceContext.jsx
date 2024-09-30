import React, { createContext, useState } from 'react'

export const userFinanceDataContext = createContext(null);

const UserFinanceContext = ({ children }) => {
    const [financeData, setFinanceData] = useState(
        {
            income: '',
            savings: '',
            debts: '',
            emi: ''
        }
    );

    const [userFPopUp, setUserFPopUp] = useState(false);

    return (
        <userFinanceDataContext.Provider value={{ financeData, setFinanceData, userFPopUp, setUserFPopUp }}>
            {children}
        </userFinanceDataContext.Provider>
    )
}
export default UserFinanceContext;
