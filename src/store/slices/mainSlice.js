import {createSlice} from "@reduxjs/toolkit";
import {fetchMeetingCode, fetchUsersRanges} from "./actionCreators";

const initialState = {
	userName: '',
	code: 'link',
	timeRanges: [],
	isLoadTimeRanges: false,
	isLoading: false,
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
	state.isLoading = false;
	state.error = action.payload;
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setUserName(state, action) {
			state.userName = action.payload;
		},
		setCoordsRanges(state, action) {
			state.interface.dates.forEach(item => {
				if (item.date === action.payload.date) {
					if (item.coordsRanges.some(range =>
						range.id === action.payload.id
					)) {
						item.coordsRanges = item.coordsRanges.map(
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
						item.coordsRanges.push({
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
						coordsRanges: item.coordsRanges.filter(range => range.id !== action.payload.id)
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
		setMonths(state, action) {
				state.interface.selectedMonths = action.payload
		},
		clearMonths(state) {
			state.interface.selectedMonths = [];
		},
		addTimeRanges(state, action) {
			state.timeRanges.push(action.payload)
		},
		setIs
	},
	extraReducers: {
		[fetchMeetingCode.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.code = action.payload;
		},
		[fetchMeetingCode.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[fetchMeetingCode.rejected]: setError,
		[fetchUsersRanges.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[fetchUsersRanges.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.apiData.fullConcurrences = action.payload
		},
		[fetchUsersRanges.rejected]: setError,
	}
});
export default mainSlice.reducer;
export const {
	setUserName,
	setCoordsRanges,
	setCurrentMonth,
	deleteSlot,
	setDate,
	setCurrentDate,
	setMonths,
	clearMonths,
	addTimeRanges
} = mainSlice.actions;