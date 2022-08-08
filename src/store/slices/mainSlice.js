import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	userName: '',
	interface: {
		dates: [
			{
				date: 1659989023000,
				ranges: []
			},
			{
				date: 1660075423000,
				ranges: [],
			}
		],
		selectedMonths: [],
		currentDate: '',
		currentMonth: ''
	},
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
		}
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
	clearMonths
} = mainSlice.actions;