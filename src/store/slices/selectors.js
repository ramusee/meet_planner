import {createSelector} from "@reduxjs/toolkit";

export const rootSelect = state => state.mainReducer;

//fetch status
export const selectIsLoading = createSelector(rootSelect, state =>  state.isLoading)
export const selectError = createSelector(rootSelect, state =>  state.error)

//home
export const selectCode = createSelector(rootSelect, state => state.code)

//datePicker
export const selectDates = createSelector(rootSelect, state => state.interface.dates);
export const selectCurrentDate = createSelector(rootSelect, state => state.interface.currentDate)

//timing
export const selectIsLoadTimeRanges = createSelector(rootSelect, state => state.isLoadTimeRanges)

//naming
export const selectUserName = createSelector(rootSelect, state => state.userName)
