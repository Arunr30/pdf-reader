export const initialState = {
  file: null,
  pages: [],
  annotations: {}, 
};

export function pdfReducer(state, action) {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, file: action.file };

    case "ADD_ANNOTATION":
      return {
        ...state,
        annotations: {
          ...state.annotations,
          [action.page]: [
            ...(state.annotations[action.page] || []),
            action.payload,
          ],
        },
      };

    default:
      return state;
  }
}
