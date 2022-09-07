export const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
export const setPending = state => {
  state.isLoading = true;
  state.error = null;
};
