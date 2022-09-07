import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dates: [],
  selectedMonths: [],
  currentDate: null,
  currentMonth: null,
};

export const datesSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setCoordsRanges(state, action) {
      state.dates.forEach(item => {
        if (item.date === action.payload.date) {
          if (item.coordsRanges.some(range => range.id === action.payload.id)) {
            item.coordsRanges.forEach(range => {
              if (range.id === action.payload.id) {
                range.top = action.payload.top;
                range.bottom = action.payload.bottom;
                range.timeStart = action.payload.timeStart;
                range.timeEnd = action.payload.timeEnd;
              }
            });
          } else {
            item.coordsRanges.push({
              id: action.payload.id,
              top: action.payload.top,
              bottom: action.payload.bottom,
              timeStart: action.payload.timeStart,
              timeEnd: action.payload.timeEnd,
            });
          }
        }
      });
    },
    deleteSlot(state, action) {
      state.dates.forEach(item => {
        if (item.date === action.payload.date) {
          item.coordsRanges = item.coordsRanges.filter(range => range.id !== action.payload.id);
        }
      });
    },
    setDates(state, action) {
      state.dates = action.payload;
    },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    setCurrentMonth(state, action) {
      state.currentMonth = action.payload;
    },
    setMonths(state, action) {
      state.selectedMonths = action.payload;
    },
  },
});
export default datesSlice.reducer;
export const { setCurrentDate, setMonths, deleteSlot, setCoordsRanges, setCurrentMonth, setDates } =
  datesSlice.actions;
