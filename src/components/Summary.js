import React from 'react';
import { useData } from '../context/DataContext';
import { Chart } from "react-google-charts";
import { Typography } from '@mui/material';


const Summary = () => {
    const { state, dispatch } = useData();

    const data = [
        ["Year", "Sales", "Expenses"],
        ["2004", 1000, 400],
        ["2005", 1170, 460],
        ["2006", 660, 1120],
        ["2007", 1030, 540],
    ];

    // Helper function to convert frequency value and unit to milliseconds
    const getIntervalMilliseconds = (freqValue, freqUnit) => {
        const unitInMilliseconds = {
            'day(s)': 24 * 60 * 60 * 1000,
            'week(s)': 7 * 24 * 60 * 60 * 1000,
            'month(s)': 30 * 24 * 60 * 60 * 1000,
            'year(s)': 365 * 24 * 60 * 60 * 1000,
        };

        return freqValue * unitInMilliseconds[freqUnit];
    };

    const constructExpenseGraph = (expenses) => {
        //// Construct domain
        // Get earliest date (s_date) in expenses array
        // Get latest date (e_date) in expenses array
        // Domain = [s_date, e_date + 2 intervals]
        const dates = expenses.map(expense => new Date(expense.startDate));
        const s_date = new Date(Math.min(...dates));
        const e_date = new Date(Math.max(...dates));

        // Calculate the number of intervals (assuming monthly intervals for simplicity)
        const numIntervals = 2;
        const interval = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        const domain = [s_date.getTime(), e_date.getTime() + numIntervals * interval];

        //// Construct y
        // Iterate through each expense in expenses array
        // For each expense, repeatedly add at each X interval (use freqValue and freqUnit) the expense amount (cost) while X is in domain
        const y = [];

        expenses.forEach(expense => {
            const { cost, freqValue, freqUnit } = expense;
            const intervalMilliseconds = getIntervalMilliseconds(freqValue, freqUnit);

            for (let i = domain[0]; i <= domain[1]; i += intervalMilliseconds) {
                y.push({ x: i, y: parseFloat(cost) });
            }
        });

        // Return X and Y arrays
        return { x: domain, y };
    };

    const constructIncomeGraph = (incomes) => {
        //// Construct domain
        // Get earliest date (s_date) in expenses array
        // Get latest date (e_date) in expenses array
        // Domain = [s_date, e_date + 2 intervals]
        const dates = incomes.map(income => new Date(income.startDate));
        const s_date = new Date(Math.min(...dates));
        const e_date = new Date(Math.max(...dates));

        // Calculate the number of intervals (assuming monthly intervals for simplicity)
        const numIntervals = 2;
        const interval = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        const domain = [s_date.getTime(), e_date.getTime() + numIntervals * interval];

        //// Construct y
        // Iterate through each expense in expenses array
        // For each expense, repeatedly increment at each X interval (use freqValue and freqUnit) the expense amount (cost) while X is in domain
        const y = [];

        incomes.forEach(income => {
            const { amount, freqValue, freqUnit } = income;
            const intervalMilliseconds = getIntervalMilliseconds(freqValue, freqUnit);

            for (let i = domain[0]; i <= domain[1]; i += intervalMilliseconds) {
                y.push({ x: i, y: parseFloat(amount) });
            }
        });

        return { x: domain, y };
    };


    const options = {
        title: "Net Income",
        curveType: "function",
        legend: { position: "bottom" },
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h2" component="h2" style={{ paddingTop: "40px" }}>
                WealthCycle
            </Typography>
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            /></div>

    );
};

export default Summary;
