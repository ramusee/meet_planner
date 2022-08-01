import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	userName: '',
	freeSlots: [],
	dates: []
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setUserName(state, action) {
			state.userName = action.payload
		},
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
		setDate(state, action) {
			state.dates = action.payload
		},
		addTimeSlots(state, action) {
		
		}
	}
});
export default mainSlice.reducer;
export const {setUserName, setSlots, deleteSlot, setDate} = mainSlice.actions;