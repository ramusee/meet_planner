import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	freeSlots: [],
	timeSlots: [],
	dates: []
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setSlots(state, action) {
			if (state.freeSlots.some(item =>
				item.id === action.payload.id
			)) {
				state.freeSlots = state.freeSlots.map(
					item => {
						if (item.id === action.payload.id) {
							return {
								...item,
								top: action.payload.top,
								bottom: action.payload.bottom
							};
						}
						return item;
					}
				);
			} else {
				state.freeSlots.push(action.payload);
			}
		},
		deleteSlot(state, action) {
			state.freeSlots = state.freeSlots.filter(item => item.id !== action.payload);
		},
		addDate(state, action) {
			state.dates.push(action.payload)
		},
		addTimeSlots(state, action) {
		
		}
	}
});
export default mainSlice.reducer;
export const {setSlots, deleteSlot, addDate} = mainSlice.actions;