import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";


export const FinancialRecordContext = createContext()
export const FinancialRecordProvider = ({children}) => {
    const [records, setRecords] = useState([])
    const {user} = useUser()

    const addRecord = async (record) => {
        const response = await fetch('http://localhost:3000/api/financial-records', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        })
        if(response.ok){
            const newRecord = await response.json()
            setRecords([...records, newRecord])
        }
    }

    const fetchRecords = async ()=>{
        if(!user) return;
        const response = await fetch(`http://localhost:3000/api/financial-records/getAllByUserID/${user?.id}`);

        if(response.ok){
            const records = await response.json() // json to js object
            console.log(records)
            setRecords(records)
        }
    }

    useEffect(()=>{
        fetchRecords()
    },[user])

    const updateRecord = async (record) => {
        const response = await fetch(`http://localhost:3000/api/financial-records/${record._id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        })
        if(response.ok){
            const updatedRecord = await response.json()
            const newRecords = records.map((record)=>{
                if(record._id === updatedRecord._id){
                    return updatedRecord
                }
                return record
            })
            setRecords(newRecords)
        }
    }
    
    const deleteRecord = async (record) => {
        const response = await fetch(`http://localhost:3000/api/financial-records/${record._id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const deleteRecord = await response.json();
            setRecords(records.filter(record => record._id !== deleteRecord._id));
        }
    };

    return (
        <FinancialRecordContext.Provider value={{records, addRecord, updateRecord, deleteRecord}}>
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