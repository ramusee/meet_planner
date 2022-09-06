import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainReducer from './slices/mainSlice'
import datesReducer from './slices/datesSlice'
import concurrencesReducer from './slices/concurrencesSlice'

const rootReducer = combineReducers({
	mainReducer,
	datesReducer,
	concurrencesReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}
