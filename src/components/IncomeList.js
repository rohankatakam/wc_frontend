import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useData } from '../context/DataContext';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

const IncomeList = () => {
    const { state, dispatch } = useData();

    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'name',
            headerName: 'Name',
            width: 100,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 100,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Start/Pay Date',
            width: 200,
            editable: true,
        },
        {
            field: 'frequency',
            headerName: 'Frequency',
            sortable: false,
            width: 200
        },
    ];

    const constructRows = state.incomes.map((income, index) => {
        return {
            id: index,
            name: income.name,
            amount: income.amount,
            date: income.startDate,
            frequency: "1x every " + income.freqValue + " " + income.freqUnit
        }
    });

    return (
        <div>
            <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
                Incomes
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <div style={{ height: "400px", width: '100%' }}>
                    <DataGrid
                        rows={constructRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>
            </FormControl>
        </div>

    );
};

export default IncomeList;
