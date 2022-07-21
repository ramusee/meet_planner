import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	busySlots: [],
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setSlots(state, action) {
			if(state.busySlots.some(item =>
				item.id === action.payload.id
			)) {
				state.busySlots = state.busySlots.map(
					item => {
						if (item.id === action.payload.id) {
							return {...item, top: action.payload.top, bottom: action.payload.top};
						}
						return item;
					}
				);
			} else {
				state.busySlots.push(action.payload)
			}
		}
	},
});
export default mainSlice.reducer;
export const {setSlots} = mainSlice.actions;