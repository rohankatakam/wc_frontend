import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

function FrequencyInput({ value, onChange }) {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <TextField
                    label="Once every"
                    type="number"
                    variant="outlined"
                    value={value.value}
                    onChange={(e) => onChange({ ...value, value: e.target.value })}
                    fullWidth
                    InputProps={{ inputProps: { min: 1 } }} // Ensure minimum value is 1
                />
            </Grid>
            <Grid item>
                <TextField
                    select
                    label="Frequency"
                    variant="outlined"
                    value={value.unit}
                    onChange={(e) => onChange({ ...value, unit: e.target.value })}
                >
                    {["day(s)", "week(s)", "month(s)", "year(s)"].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    );
}

export default FrequencyInput;
