import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMeetingCode = createAsyncThunk(
	'main/fetchCode',
	async function () {
		const response = await axios.get('/');
	}
);
export const fetchUserRanges = createAsyncThunk(
	'main/fetchUserRanges',
	async function (code, {rejectWithValue}) {
		try {
			const response = await axios.get(`/${code}`);
			if (!response.ok) {
				throw new Error('Server error');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const postRanges = createAsyncThunk(
	'main/postRanges',
	async function ({userName, userRanges}) {
	
	}
);