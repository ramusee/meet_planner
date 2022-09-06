import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getApi} from "../api/api";
import {saveCurrentCode} from "../helpers/localStorage";


export const fetchMeetingCode = createAsyncThunk(
	'main/fetchMeetingCode',
	async function (_, {rejectWithValue}) {
		try {
			const response = await axios.get(getApi());
			const code = response.data.code
			saveCurrentCode(code)
			if (response.status !== 200) {
				throw new Error('Server error');
			}
			return code
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.message);
		}
	}
);
export const fetchUsersRanges = createAsyncThunk(
	'main/fetchUserRanges',
	async function (code, {rejectWithValue}) {
		try {
			const response = await axios.get(getApi(code));
			if (response.status !== 200) {
				throw new Error('Can\'t get ranges. Server Error');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const postRanges = createAsyncThunk(
	'main/postRanges',
	async function ({ userName, userRanges}, {rejectWithValue, getState}) {
		try {
			const code = getState().mainReducer.code;
			const response = await axios.post(getApi(code), {
				username: userName,
				user_ranges: userRanges
			});
			if (response.status !== 200) {
				throw new Error('Can\'t add time-ranges. Server Error');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);