import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchMeetingCode = createAsyncThunk(
	'main/fetchCode',
	async function (_, {rejectWithValue}) {
		try {
			const response = await axios.get(`${API_URL}/`);
			if (!response.ok) {
				throw new Error('Server error');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
		
	}
);
export const fetchUsersRanges = createAsyncThunk(
	'main/fetchUserRanges',
	async function (code, {rejectWithValue, dispatch}) {
		try {
			const response = await axios.get(`${API_URL}/${code}`);
			if (!response.ok) {
				throw new Error('Can\'t get ranges. Server Error');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const postRanges = createAsyncThunk(
	'main/postRanges',
	async function ({userName, userRanges}, {dispatch, rejectWithValue, getState}) {
		try {
			const code = getState().mainReducer.code;
			const response = await axios.post(`${API_URL}/${code}`, {
				username: userName,
				user_ranges: userRanges
			});
			if (!response.ok) {
				throw new Error('Can\'t add time-ranges. Server Error');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);