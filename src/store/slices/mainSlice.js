import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	userName: '',
	interface: {
		dates: [],
		currentDate: '',
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
					return item
				}
			});
		},
		deleteSlot(state, action) {
			state.interface.dates = state.interface.dates.map(item => {
				if(item.date === action.payload.date) {
					return {...item,
						ranges: item.ranges.filter(range => range.id !== action.payload.id)};
				}
				return item
			})
		},
		setDate(state, action) {
			state.interface.dates = action.payload;
		},
		setCurrentDate(state, action) {
			state.interface.currentDate = action.payload;
		}
	}
});
export default mainSlice.reducer;
export const {setUserName, setRanges, deleteSlot, setDate, setCurrentDate} = mainSlice.actions;