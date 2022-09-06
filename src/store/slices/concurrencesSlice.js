import {createSlice} from "@reduxjs/toolkit";
import {fetchUsersRanges} from "../actionCreators";
import {setError, setPending} from "../helpers";


const initialState = {
	fullConcurrences: [{
		userNames: [],
		range: []
	},]
};

export const concurrencesSlice = createSlice({
		name: 'concurrences',
		initialState,
		reducers: {},
		extraReducers: {
			[fetchUsersRanges.fulfilled]: (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.apiData.fullConcurrences = action.payload;
			},
			[fetchUsersRanges.pending]: setPending,
			[fetchUsersRanges.rejected]: setError,
		}
	}
);
export default concurrencesSlice.reducer