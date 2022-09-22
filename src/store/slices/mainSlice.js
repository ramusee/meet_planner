import { createSlice } from '@reduxjs/toolkit';

import { fetchMeetingCode } from '../actionCreators';
import { setErrorMeetingCode, setPendingMeetingCode } from '../helpers';
import { getMeetingCode } from '../../helpers/localStorage';

const initialState = {
  userName: null,
  meetingCode: getMeetingCode(),
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
    setMeetingCode(state, action) {
      state.meetingCode = action.payload;
    },
  },
  extraReducers: {
    [fetchMeetingCode.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.meetingCode = action.payload;
    },
    [fetchMeetingCode.pending]: setPendingMeetingCode,
    [fetchMeetingCode.rejected]: setErrorMeetingCode,
  },
});
export default mainSlice.reducer;
export const { setUserName, setMeetingCode } = mainSlice.actions;
