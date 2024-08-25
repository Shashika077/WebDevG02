import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import { assets } from '../../assets/assets';
import Chart from 'chart.js/auto';

const Dashboard = () => {
    const [revenue, setRevenue] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [profit, setProfit] = useState(0);
    const [sellr, setSellr] = useState(0);
    const [topItems, setTopItems] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const barChartContainer = useRef(null);
    const pieChartContainer = useRef(null);

    useEffect(() => {
        fetch('http://localhost/Web/backend/ds.php')
            .then(response => response.json())
            .then(data => {
                setRevenue(data.revenue);
                setExpenses(data.expenses);
                setProfit(data.profit);
                setSellr(data.sellr);
                setTopItems(data.top_items.slice(0, 5));
                setExpenseCategories(data.expense_categories); 
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (topItems.length > 0 && barChartContainer.current) {
            const labels = topItems.map(item => item.product_id);
            const data = topItems.map(item => item.total_quantity);

            new Chart(barChartContainer.current, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Quantity Sold',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                        hoverBorderColor: 'rgba(54, 162, 235, 1)',
                        barThickness: 100
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) { return `${value}`; }
                            }
                        }
                    }
                }
            });
        }
    }, [topItems]);

    useEffect(() => {
        if (expenseCategories.length > 0 && pieChartContainer.current) {
            const labels = expenseCategories.map(item => item.category);
            const data = expenseCategories.map(item => item.total_amount);

            new Chart(pieChartContainer.current, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Expense Distribution',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 2
                    }]
                }
            });
        }
    }, [expenseCategories]);
    const convertToCSV = (data) => {
        const header = Object.keys(data[0]);
        const rows = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName]  )).join(','));
        return [header.join(','), ...rows].join('\r\n');
    };
    
    const downloadCSV = (filename, data) => {
        const csv = convertToCSV(data);
        const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(csvBlob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    
    const downloadDashboardData = () => {
        const data = [
            { Category: 'Revenue', Amount: revenue.toFixed(2) },
            { Category: 'Expenses', Amount: expenses.toFixed(2) },
            { Category: 'Sell Return', Amount: sellr.toFixed(2) },
            { Category: 'Profit', Amount: profit.toFixed(2) },
            ...topItems.map(item => ({
                Category: `Top Item ${item.product_id}`,
                Amount: item.total_quantity
            })),
            ...expenseCategories.map(item => ({
                Category: `Expense ${item.category}`,
                Amount: item.total_amount
            }))
        ];

        downloadCSV('dashboard_data.csv', data);
    };

    return (
        <>
            <div className="dashboard">
                <div className="dashboard-content1">
                    <img className="reve" src={assets.reve} alt="reve" />
                    <div className="text-container">
                        <p className="dashboard-text">Revenue</p>
                        <p className="dashboard-text1">$ {revenue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="dashboard-content1">
                    <img className="reve" src={assets.ph} alt="reve" />
                    <div className="text-container">
                        <p className="dashboard-text">Expenses</p>
                        <p className="dashboard-text1">$ {expenses.toFixed(2)}</p>
                    </div>
                </div>
                <div className="dashboard-content1">
                    <img className="reve" src={assets.sr} alt="reve" />
                    <div className="text-container">
                        <p className="dashboard-text">Sell Return</p>
                        <p className="dashboard-text1">$ {sellr.toFixed(2)}</p>
                    </div>
                </div>
                <div className="dashboard-content1">
                    <img className="reve" src={assets.profit} alt="reve" />
                    <div className="text-container">
                        <p className="dashboard-text">Profit</p>
                        <p className="dashboard-text1">$ {profit.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div className="main1">
                <div className="top-selling-items">
                    <h2>Top Selling Items</h2>
                    <div className="chart-container">
                        <canvas ref={barChartContainer}></canvas>
                    </div>
                </div>
                <div className="expense-chart">
                    <h2>Expense Breakdown</h2>
                    <div className="chart-container1">
                        <canvas ref={pieChartContainer}></canvas>
                    </div>
                </div> 
            </div>
            <button onClick={downloadDashboardData} className="download-button">Download CSV</button>
        </>
    );
};

export default Dashboard;
