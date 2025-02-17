import express from 'express';
import FinancialRecordModel from '../src/schema/financial-record.js';

const router = express.Router();

router.get('/getAllByUserID/:userID', async (req, res) => {
    try {
        const financialRecords = await FinancialRecordModel.find({ userID: req.params.userID });
        if(financialRecords.length === 0) {
            return res.status(404).json({ message: "No financial records found for this user" });
        }
        res.status(200).json(financialRecords);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} )

router.post('/', async (req, res) => {
    
    try {
        const newFinancialRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newFinancialRecordBody);
        const savedRecord = await newRecord.save();

        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const newRecordBody = req.body;
        const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(id,newRecordBody,{new:true});
        if(!updatedRecord){
            return res.status(404).json({message: "Record not found"});
        }
        res.status(200).json(updatedRecord);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedRecord = await FinancialRecordModel.findByIdAndDelete(id);

        if(!deletedRecord){
            return res.status(404).json({message: "Record not found"});
        }

        res.status(200).json(deletedRecord);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

export default router;