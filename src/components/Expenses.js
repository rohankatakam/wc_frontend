import React from 'react';
import { Grid } from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseGrid from './ExpenseGrid';

const Expenses = () => {
    return (
        <div style={{ padding: "20px" }}>
            <Grid container spacing={2}>
                <Grid xs={12} lg={4} style={{ padding: "20px" }}>
                    <ExpenseForm />
                </Grid>
                <Grid xs={12} lg={8} style={{ padding: "20px" }}>
                    <ExpenseGrid />
                </Grid>
            </Grid>
        </div>
    );
};

export default Expenses;
