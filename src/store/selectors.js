import { createSelector } from '@reduxjs/toolkit';

const rootSelect = state => state;
const selectMainState = createSelector(rootSelect, root => root.mainReducer);
const selectDatesState = createSelector(rootSelect, root => root.datesReducer);
const selectConcurrencesState = createSelector(rootSelect, root => root.concurrencesReducer);

//fetch status
export const selectIsLoading = createSelector(selectMainState, state => state.isLoading);
export const selectError = createSelector(selectMainState, state => state.error);

//home
export const selectCode = createSelector(selectMainState, state => state.meetingCode);

//datePicker
export const selectDates = createSelector(selectDatesState, state => state.dates);
export const selectCurrentDate = createSelector(selectDatesState, state => state.currentDate);
export const selectCurrentMonth = createSelector(selectDatesState, state => state.currentMonth);
export const selectMonths = createSelector(selectDatesState, state => state.selectedMonths);

//naming
export const selectUserName = createSelector(selectMainState, state => state.userName);

//concurrences
export const selectFullConcurrences = createSelector(
  selectConcurrencesState,
  state => state.fullConcurrences,
);
