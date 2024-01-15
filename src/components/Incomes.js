import React from 'react';
import { Grid } from '@mui/material';
import IncomeList from './IncomeList';
import IncomeForm from './IncomeForm';

const Incomes = () => {
    return (
        <div style={{ padding: "20px" }}>
            <Grid container spacing={2}>
                <Grid xs={12} lg={4} style={{ padding: "20px" }}>
                    <IncomeForm />
                </Grid>
                <Grid xs={12} lg={8} style={{ padding: "20px" }}>
                    <IncomeList />
                </Grid>
            </Grid>
        </div>
    );
};

export default Incomes;
