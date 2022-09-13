import { createSlice } from '@reduxjs/toolkit';
import { fetchMeetingConcurrences } from '../actionCreators';
import { setError, setPending } from '../helpers';

const initialState = {
  fullConcurrences: [],
  partConcurrences: [],
};

export const concurrencesSlice = createSlice({
  name: 'concurrences',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMeetingConcurrences.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.fullConcurrences = action.payload;
    },
    [fetchMeetingConcurrences.pending]: setPending,
    [fetchMeetingConcurrences.rejected]: setError,
  },
});
export default concurrencesSlice.reducer;
