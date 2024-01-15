import React, { createContext, useContext, useReducer } from 'react';

const DataContext = createContext({});

export function DataProvider({ children }) {
    const [state, dispatch] = useReducer(dataReducer, { expenses: [], incomes: [] });


    function dataReducer(state, action) {
        switch (action.type) {
            case 'ADD_EXPENSE':
                return {
                    ...state,
                    expenses: [...state.expenses, action.payload],
                };
            case 'ADD_INCOME':
                return {
                    ...state,
                    incomes: [...state.incomes, action.payload],
                };
            case 'SET_DATA':
                return action.payload;

            case 'SAVE_DATA':
                return state;
            default:
                return state;
        }
    }

    return (
        <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}