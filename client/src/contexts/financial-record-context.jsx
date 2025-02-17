import { createContext } from "react";


export const FinancialRecordContext = createContext()
export const FinancialRecordProvider = ({children}) => {
    const [records, setRecords] = useState([])
    const addRecord = (record) => {
        setRecords([...records, record])
    }

    return (
        <FinancialRecordContext.Provider value={{records, addRecord}}>
            {children}
        </FinancialRecordContext.Provider>
    )
}

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordContext)
    if(!context){
        throw new Error('useFinancialRecord must be used within a FinancialRecordProvider')
    }
    return context;
}