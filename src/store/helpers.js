export const setErrorMeetingCode = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
export const setPendingMeetingCode = state => {
  state.isLoading = true;
  state.error = null;
};

export const setErrorFetchConcurrences = (state, action) => {
  state.isLoadingFetchConcurrences = false;
  state.errorFetchConcurrences = action.payload;
};
export const setPendingFetchConcurrences = state => {
  state.isLoadingFetchConcurrences = true;
  state.errorFetchConcurrences = null;
};

export const setErrorPostTimeRanges = (state, action) => {
  state.isLoadingPostTimeRanges = false;
  state.errorPostTimeRanges = action.payload;
};
export const setPendingPostTimeRanges = state => {
  state.isLoadingPostTimeRanges = true;
  state.errorPostTimeRanges = null;
};
