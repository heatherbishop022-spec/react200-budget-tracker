import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const ExpenseEntries = () => {
    const { state, dispatch } = useContext(AppContext);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const [editingIndex, setEditingIndex] = useState(null);
    const [editDescription, setEditDescription] = useState('');
    const [editAmount, setEditAmount] = useState('');

    const addExpense = () => {
        const value = parseFloat(amount);
        if (!description.trim() || isNaN(value)) return;
        dispatch({ type: 'ADD_EXPENSE', payload: { description, amount: value } });
        setDescription('');
        setAmount('');
    };

    const startEdit = (index) => {
        setEditingIndex(index);
        setEditDescription(state.expenses[index].description);
        setEditAmount(String(state.expenses[index].amount));
    };

    const saveEdit = () => {
        const value = parseFloat(editAmount);
        if (!editDescription.trim() || isNaN(value)) return;
        dispatch({
            type: 'UPDATE_EXPENSE',
            payload: { index: editingIndex, entry: { description: editDescription, amount: value } }
        });
        setEditingIndex(null);
    };

    const deleteExpense = (index) => {
        dispatch({ type: 'DELETE_EXPENSE', payload: index });
        setEditingIndex(null);
    };

    return (
        <div className="bg-red-100 border-4 border-red-500 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Expense Entries</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Description"
                    className="border-2 border-red-300 p-2 w-full mb-2 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="border-2 border-red-300 p-2 w-full mb-2 rounded"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded w-full"
                    onClick={addExpense}
                >
                    + Add Expense
                </button>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="border-2 border-red-300 p-2">Description</th>
                        <th className="border-2 border-red-300 p-2">Amount</th>
                        <th className="border-2 border-red-300 p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {state.expenses.map((expense, index) =>
                        editingIndex === index ? (
                            <tr key={index}>
                                <td className="border-2 border-red-300 p-2">
                                    <input
                                        type="text"
                                        className="border p-1 w-full rounded"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                </td>
                                <td className="border-2 border-red-300 p-2">
                                    <input
                                        type="number"
                                        className="border p-1 w-full rounded"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                    />
                                </td>
                                <td className="border-2 border-red-300 p-2 text-center whitespace-nowrap">
                                    <button className="text-green-700 hover:text-green-900 font-semibold mr-3" onClick={saveEdit}>
                                        Save
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-800 font-semibold" onClick={() => setEditingIndex(null)}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={index}>
                                <td className="border-2 border-red-300 p-2">{expense.description}</td>
                                <td className="border-2 border-red-300 p-2">${expense.amount.toFixed(2)}</td>
                                <td className="border-2 border-red-300 p-2 text-center whitespace-nowrap">
                                    <button className="text-blue-600 hover:text-blue-800 font-semibold mr-3" onClick={() => startEdit(index)}>
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 font-semibold" onClick={() => deleteExpense(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseEntries;