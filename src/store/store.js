import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainReducer from './slices/mainSlice'

const rootReducer = combineReducers({
	mainReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}
