import {createSlice} from "@reduxjs/toolkit";
import {fetchMeetingCode, fetchUsersRanges} from "./actionCreators";

const initialState = {
	userName: '',
	code: 'link',
	timeRanges: [],
	loading: false,
	error: null,
	interface: {
		dates: [],
		selectedMonths: [],
		currentDate: null,
		currentMonth: null
	},
	apiData: {
		fullConcurrences: [{
			userNames: [],
			range: []
		},]
	}
};

const setError = (state, action) => {
	state.loading = false;
	state.error = action.payload;
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setUserName(state, action) {
			state.userName = action.payload;
		},
		setRanges(state, action) {
			state.interface.dates.forEach(item => {
				if (item.date === action.payload.date) {
					if (item.ranges.some(range =>
						range.id === action.payload.id
					)) {
						item.ranges = item.ranges.map(
							range => {
								if (range.id === action.payload.id) {
									return {
										...range,
										top: action.payload.top,
										bottom: action.payload.bottom
									};
								}
								return range;
							}
						);
					} else {
						item.ranges.push({
							id: action.payload.id,
							top: action.payload.top,
							bottom: action.payload.bottom
						});
					}
					return item;
				}
			});
		},
		deleteSlot(state, action) {
			state.interface.dates = state.interface.dates.map(item => {
				if (item.date === action.payload.date) {
					return {
						...item,
						ranges: item.ranges.filter(range => range.id !== action.payload.id)
					};
				}
				return item;
			});
		},
		setDate(state, action) {
			state.interface.dates = action.payload;
		},
		setCurrentDate(state, action) {
			state.interface.currentDate = action.payload;
		},
		setCurrentMonth(state, action) {
			state.interface.currentMonth = action.payload;
		},
		addMonth(state, action) {
			if (!state.interface.selectedMonths.includes(action.payload)) {
				state.interface.selectedMonths.push(action.payload);
			}
		},
		clearMonths(state) {
			state.interface.selectedMonths = [];
		},
		addTimeRanges(state, action) {
			state.timeRanges.push(action.payload)
		}
	},
	extraReducers: {
		[fetchMeetingCode.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.code = action.payload;
		},
		[fetchMeetingCode.pending]: (state) => {
			state.status = true;
			state.error = null;
		},
		[fetchMeetingCode.rejected]: setError,
		[fetchUsersRanges.pending]: (state) => {
			state.status = true;
			state.error = null;
		},
		[fetchUsersRanges.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.apiData.fullConcurrences = action.payload
		},
		[fetchUsersRanges.rejected]: setError,
	}
});
export default mainSlice.reducer;
export const {
	setUserName,
	setRanges,
	setCurrentMonth,
	deleteSlot,
	setDate,
	setCurrentDate,
	addMonth,
	clearMonths,
	addTimeRanges
} = mainSlice.actions;