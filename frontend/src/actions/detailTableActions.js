// detailTableActions.js
import {
    UPDATE_DETAIL_TABLE,
    ADD_DETAIL_TABLE_ROW,
    REMOVE_DETAIL_TABLE_ROW,
    RESET_DETAIL_TABLE
  } from './actionType'; // Update the import path
  
  export const updateDetailTable = (rows) => ({
    type: UPDATE_DETAIL_TABLE,
    payload: rows,
  });
  
  export const addDetailTableRow = () => ({
    type: ADD_DETAIL_TABLE_ROW,
  });
  
  export const removeDetailTableRow = (index) => ({
    type: REMOVE_DETAIL_TABLE_ROW,
    payload: index,
  });
  
  // detailTableActions.js


export const resetDetailTable = () => ({
  type: RESET_DETAIL_TABLE,
});
