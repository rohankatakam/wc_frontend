import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import { useData } from '../context/DataContext';
import { Chip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LoopIcon from '@mui/icons-material/Loop';
import { Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardHeader from '@mui/material/CardHeader';

function ExpenseGrid() {
    const { state, dispatch } = useData();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredExpenses =
        selectedCategory === 'All'
            ? state.expenses
            : state.expenses.filter((expense) => expense.category === selectedCategory);

    const onUpdate = (expense) => {
        console.log("update", expense)
    }

    const onDelete = (expenseId) => {
        console.log("delete", expenseId)
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                Expenses
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Filter by Category</InputLabel>
                <Select
                    label="Filter by Category"
                    value={selectedCategory}
                    onChange={handleChange}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Utilities">Utilities</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                    {/* Add more categories as needed */}
                </Select>
            </FormControl>


            <Grid container spacing={2}>
                {filteredExpenses.map((expense) => (
                    <Grid item xs={12} sm={6} md={4} key={expense.id}>
                        <Card style={{ textAlign: "left" }}>
                            <CardHeader title={expense.name} subheader={expense.category}>
                            </CardHeader>
                            <CardContent>
                                <Stack direction="row" spacing={1}>
                                    <Chip label={expense.cost} icon={<AttachMoneyIcon />} color="success" />
                                    <Chip label={expense.freqValue + " " + expense.freqUnit} icon={<LoopIcon />} color="primary" />
                                </Stack>
                            </CardContent>

                            <CardActions>
                                <IconButton aria-label="delete"
                                    onClick={() => onDelete(expense.id)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="edit"
                                    onClick={() => onUpdate(expense)}>
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ExpenseGrid;
