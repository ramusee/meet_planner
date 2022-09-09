import { createSlice } from '@reduxjs/toolkit';

import { fetchMeetingCode } from '../actionCreators';
import { setError, setPending } from '../helpers';
import { getMeetingCode } from '../../helpers/localStorage';

const initialState = {
  userName: '',
  code: getMeetingCode(),
  timeRanges: [],
  isLoadTimeRanges: false,
  isLoading: false,
  error: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setIsLoadTimeRanges(state, action) {
      state.isLoadTimeRanges = action.payload;
    },
  },
  extraReducers: {
    [fetchMeetingCode.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.code = action.payload;
    },
    [fetchMeetingCode.pending]: setPending,
    [fetchMeetingCode.rejected]: setError,
  },
});
export default mainSlice.reducer;
export const { setUserName, setIsLoadTimeRanges } = mainSlice.actions;
