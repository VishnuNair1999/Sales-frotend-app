// detailTableReducer.js
import {
  UPDATE_DETAIL_TABLE,
  ADD_DETAIL_TABLE_ROW,
  REMOVE_DETAIL_TABLE_ROW,
  RESET_DETAIL_TABLE
} from '../actions/actionType'; // Update the import path

const initialState = {
  rows: [], // Initial state for the detail table
};

const detailTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DETAIL_TABLE:
      return {
        ...initialState,
      };
    case UPDATE_DETAIL_TABLE:
      return {
        ...state,
        rows: action.payload,
      };
    case ADD_DETAIL_TABLE_ROW:
      return {
        ...state,
        rows: [...state.rows, {}],
      };
    case REMOVE_DETAIL_TABLE_ROW:
      return {
        ...state,
        rows: state.rows.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default detailTableReducer;
