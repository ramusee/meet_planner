import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getApi } from '../api/api';
import { saveMeetingCode } from '../helpers/localStorage';

export const fetchMeetingCode = createAsyncThunk(
  'main/fetchMeetingCode',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(getApi());
      if (response.status >= 400) {
        throw new Error('Server error');
      }
      const meetingCode = response.data.code;
      saveMeetingCode(meetingCode);
      return meetingCode;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchMeetingConcurrences = createAsyncThunk(
  'main/fetchMeetingConcurrences',
  async function (_, { rejectWithValue, getState }) {
    try {
      const meetingCode = getState().mainReducer.meetingCode;
      const response = await axios.get(getApi(`meeting/${meetingCode}`));
      if (response.status >= 400) {
        throw new Error("Can't get ranges. Server Error");
      }
      return response.data.user_ranges;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const postTimeRanges = createAsyncThunk(
  'main/postTimeRanges',
  async function ({ userName, userRanges }, { rejectWithValue, getState }) {
    try {
      const meetingCode = getState().mainReducer.meetingCode;
      const data = {
        username: userName,
        user_ranges: userRanges,
      };
      const response = await axios.post(getApi(`${meetingCode}/`), data);
      console.log(response);
      if (response.status >= 400) {
        throw new Error("Can't add time-ranges. Server Error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
