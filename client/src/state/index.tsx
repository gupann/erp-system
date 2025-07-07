import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface InitStateType {
    isSidebarCollapsed: boolean;
}

// TO DO: add for dark mode here as well
const initialState: InitStateType = {
    isSidebarCollapsed: false,
}

// reference: https://redux-toolkit.js.org/rtk-query/overview
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
    },
});

export const { setIsSidebarCollapsed} = globalSlice.actions;
export default globalSlice.reducer;