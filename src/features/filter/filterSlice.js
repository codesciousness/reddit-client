import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter: (state, action) => {
            let filter = action.payload;
            if (filter === 'ComputerScience') {
                filter = 'Computer Science';
            }
            state = filter;
            return state;
        },
        clearFilter: (state) => {
            state = '';
            return state;
        }
    }
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;

export const selectFilter = state => state.filter;