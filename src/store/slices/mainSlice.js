import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	freeSlots: [],
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
	}
});
export default mainSlice.reducer;
export const {setSlots, deleteSlot} = mainSlice.actions;