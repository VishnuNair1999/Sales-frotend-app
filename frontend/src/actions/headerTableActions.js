// headerTableActions.js
import {
    UPDATE_VR_NO,
    UPDATE_VR_DATE,
    UPDATE_AC_NAME,
    UPDATE_AC_AMT,
    UPDATE_STATUS,
   
  } from './actionType'; // Fix the import path
  
  export const updateVrNo = (value) => ({
    type: UPDATE_VR_NO,
    payload: value,
  });
  
  export const updateVrDate = (value) => ({
    type: UPDATE_VR_DATE,
    payload: value,
  });
  
  export const updateAcName = (value) => ({
    type: UPDATE_AC_NAME,
    payload: value,
  });
  
  export const updateAcAmt = (value) => ({
    type: UPDATE_AC_AMT,
    payload: value,
  });
  
  export const updateStatus = (value) => ({
    type: UPDATE_STATUS,
    payload: value,
  });
  
  export const RESET_DETAIL_TABLE = 'RESET_DETAIL_TABLE';
  export const resetDetailTable = () => ({
    type: RESET_DETAIL_TABLE,
  });