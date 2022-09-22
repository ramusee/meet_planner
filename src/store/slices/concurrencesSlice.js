import { createSlice } from '@reduxjs/toolkit';
import { fetchMeetingConcurrences, postTimeRanges } from '../actionCreators';
import {
  setErrorFetchConcurrences,
  setErrorPostTimeRanges,
  setPendingFetchConcurrences,
  setPendingPostTimeRanges,
} from '../helpers';

const initialState = {
  fullConcurrences: [],
  partConcurrences: [],
  postSuccess: false,

  isLoadingFetchConcurrences: false,
  errorFetchConcurrences: null,

  isLoadingPostTimeRanges: false,
  errorPostTimeRanges: null,
};

export const concurrencesSlice = createSlice({
  name: 'concurrences',
  initialState,
  reducers: {
    setFalseSuccess: state => {
      state.postSuccess = false;
    },
  },
  extraReducers: {
    [fetchMeetingConcurrences.fulfilled]: (state, action) => {
      state.isLoadingFetchConcurrences = false;
      state.error = null;
      state.fullConcurrences = action.payload;
    },
    [fetchMeetingConcurrences.pending]: setPendingFetchConcurrences,
    [fetchMeetingConcurrences.rejected]: setErrorFetchConcurrences,

    [postTimeRanges.fulfilled]: (state, action) => {
      state.isLoadingPostTimeRanges = false;
      state.errorPostTimeRanges = null;
      state.postSuccess = action.payload;
    },
    [postTimeRanges.pending]: setPendingPostTimeRanges,
    [postTimeRanges.rejected]: setErrorPostTimeRanges,
  },
});

export default concurrencesSlice.reducer;
export const { setFalseSuccess } = concurrencesSlice.actions;
