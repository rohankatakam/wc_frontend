import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useData } from '../context/DataContext';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Switch } from '@mui/material';

function IncomeForm() {
    const { state, dispatch } = useData();
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        freqValue: '',
        freqUnit: 'day(s)',
    });

    const [oneTime, setOneTime] = useState(false);

    const handleOneTimeChange = (e) => {
        setOneTime(e.target.checked);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addIncome = () => {
        dispatch({ type: 'ADD_INCOME', payload: { ...formData, oneTime: oneTime } });
        setFormData({
            name: '',
            amount: 0.0,
            freqValue: 0,
            freqUnit: 'day(s)'
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addIncome();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item>
                    <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                        Add Income
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Grid container direction="row-reverse">
                        <Grid item><span>{oneTime ? "One Time" : "Recurring"}</span><Switch label="Label" checked={oneTime} onChange={handleOneTimeChange} /></Grid>
                    </Grid>
                </Grid>
            </Grid>

            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Amount"
                variant="outlined"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />

            <FormControl fullWidth variant="outlined" required margin="normal" style={{ "display": oneTime ? "none" : "block" }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8} fullWidth>
                        <TextField
                            name="freqValue"
                            label="Once every"
                            type="number"
                            variant="outlined"
                            value={formData.freqValue}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ inputProps: { min: 1 } }} // Ensure minimum value is 1
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            select
                            name="freqUnit"
                            label="Frequency"
                            variant="outlined"
                            value={formData.freqUnit}
                            fullWidth
                            onChange={handleChange}
                        >
                            {["day(s)", "week(s)", "month(s)", "year(s)"].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth variant="outlined" required margin="normal">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={oneTime ? 'Pay Date' : 'Start Date'}
                        variant="outlined"
                        fullWidth
                        value={formData.startDate}
                        onChange={(date) => setFormData({ ...formData, startDate: date })}
                    />
                </LocalizationProvider>
            </FormControl>

            <FormControl fullWidth variant="outlined" required margin="normal">
                <Button type="submit" variant="outlined" color="primary">
                    Submit
                </Button>
                <br />
                <Button type="submit" variant="outlined" color="primary">
                    Save
                </Button>
            </FormControl>
        </form>
    );
}

export default IncomeForm;
