import React, { useState, useEffect } from 'react';
import './Expenss.css';

const ExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    // Calculate total expenses whenever expenses array changes
    useEffect(() => {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalExpenses(total);
    }, [expenses]);

    const handleAddExpense = () => {
        if (amount && category) {
            const newExpense = { amount: parseFloat(amount), category: category };
            setExpenses([...expenses, newExpense]);
            setAmount('');
            setCategory('');
        } else {
            console.error('Please enter amount and select category');
        }
    };

    const handleDeleteExpense = (index) => {
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(index, 1);
        setExpenses(updatedExpenses);
    };

    const handleClearExpenses = () => {
        setExpenses([]);
    };

    const handleSubmitExpenses = () => {
        // Send all expenses to backend PHP script
        fetch('http://localhost/Web/backend/addExpense.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ expenses }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Handle success or error message
            if (data.success) {
                console.log('Expenses submitted successfully');
                setExpenses([]); // Clear the expenses list after submission
            } else {
                console.error('Failed to submit expenses:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="main">
            <div className="expense-form">
                <form onSubmit={e => e.preventDefault()}>
                    <label>
                        Expense:
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="">Expense type</option>
                            <option value="Delivery">Delivery</option>
                            <option value="Repair">Repair</option>
                            
                            
                        </select>
                    </label>
                    <br />
                    <label>
                        Amount:
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    </label>
                    <br />
                    <button type="button" onClick={handleAddExpense}>Add Expense</button>
                    <button type="button" onClick={handleSubmitExpenses}>Submit Expenses</button>
                    <button type="button" onClick={handleClearExpenses}>Clear All</button>
                </form>

                {/* Display the list of expenses */}
                {expenses.length > 0 && (
                    <div className="expense-list">
                        <h3>Expenses</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense, index) => (
                                    <tr key={index}>
                                        <td>${expense.amount.toFixed(2)}</td>
                                        <td>{expense.category}</td>
                                        <td><button className="delete-button" onClick={() => handleDeleteExpense(index)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Display total expenses */}
                <div className="total-expenses">
                    <strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default ExpenseForm;
