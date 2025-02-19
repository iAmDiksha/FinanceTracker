import { useFinancialRecords } from "../../contexts/financial-record-context"
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useState } from "react";
import Modal from 'react-modal';

const key = 'Composed Table';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '10px',
        width: '80%',
        maxWidth: '500px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    input:{
        width: '100%',
        padding: '5px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
    },
    button: {
        padding: '10px 20px',
        margin: '10px 5px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    saveButton: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        color: 'black',
    },
};

export const FinancialRecordList = () => {
    const { records, updateRecord, deleteRecord } = useFinancialRecords()
    const theme = useTheme(getTheme());
    const data = { nodes: records }

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editValues, setEditValues] = useState({});

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);

    const openModel = (record) => {
        setIsModalOpen(true)
        setEditValues(record)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditValues({})
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditValues({ ...editValues, [name]: value })
    }

    const handleSave = () => {
        updateRecord(editValues)
        closeModal();
    }

    const openDeleteConfirm = (record) => {
        setRecordToDelete(record)
        setIsDeleteConfirmOpen(true)
    }

    const closeDeleteConfirm = () => {
        setRecordToDelete(null)
        setIsDeleteConfirmOpen(false)
    }

    const handleDelete = ()=>{
        deleteRecord(recordToDelete)
        closeDeleteConfirm();
    }

    return (
        <div className='financial-record-list-container'>
            {(!isModalOpen && !isDeleteConfirmOpen) && ( <Table data={data} theme={theme} key={key}>
                {
                    (tablelist) => (
                        <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell>Description</HeaderCell>
                                    <HeaderCell>Amount</HeaderCell>
                                    <HeaderCell>Category</HeaderCell>
                                    <HeaderCell>Payment Method</HeaderCell>
                                    <HeaderCell>Date</HeaderCell>
                                    <HeaderCell>Actions</HeaderCell>
                                </HeaderRow>
                            </Header>
                            <Body>
                                {tablelist.map((record) => (
                                    <Row key={record._id}>
                                        <Cell>{record.description}</Cell>
                                        <Cell>{record.amount}</Cell>
                                        <Cell>{record.category}</Cell>
                                        <Cell>{record.paymentMethod}</Cell>
                                        <Cell>{formatDate(record.date)}</Cell>
                                        <cell>
                                            <button className="edit" onClick={() => openModel(record)}>Edit</button>
                                            <button className="del" onClick={()=> openDeleteConfirm(record)}>Delete</button>
                                        </cell>
                                    </Row>
                                ))}
                            </Body>
                        </>
                    )
                }
            </Table>)}

            <Modal isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Record"
                style={customStyles}>
                <h2>Edit Record</h2>
                <form onSubmit={handleSave}>
                    <label>Description:
                        <input
                            type="text"
                            name="description"
                            value={editValues.description || ''}
                            onChange={handleChange}
                            required
                            style={customStyles.input}
                        />
                    </label>
                    <label>Amount:
                        <input
                            type="number"
                            name="amount"
                            value={editValues.amount || ''}
                            onChange={handleChange}
                            required
                            style={customStyles.input}
                        />
                    </label>
                    <label>
                        Category:
                         <select required  name="category" className="input"  value={editValues.category || ''} onChange={handleChange} style={customStyles.input}>
                        <option value="">Select a Category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                    </label>
                    <label>
                        Payment Method:
                        <select required name="paymentMethod" className="input"  value={editValues.paymentMethod || ''}  onChange={handleChange} style={customStyles.input}>
                        <option value="">Select a Payment Method</option>
                        <option value="Credit card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={editValues.date ? new Date(editValues.date).toISOString().split('T')[0] : ''}
                            onChange={handleChange}
                            required
                            style={customStyles.input}
                        />
                    </label>
                    <button type="submit" style={{ ...customStyles.button, ...customStyles.saveButton }}>Save</button>
                    <button type="button" onClick={closeModal} style={{ ...customStyles.button, ...customStyles.cancelButton }}>Cancel</button>
                </form>
            </Modal>

            <Modal isOpen={isDeleteConfirmOpen}
            onRequestClose={closeDeleteConfirm}
            contentLabel="Confirm Delete"
            style={customStyles}
            >
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this record?</p>
                <button onClick={handleDelete} style={{ ...customStyles.button, ...customStyles.saveButton }}>Delete</button>
                <button onClick={closeDeleteConfirm} style={{ ...customStyles.button, ...customStyles.cancelButton }}>Cancel</button>
            </Modal>
        </div>
    )
}

