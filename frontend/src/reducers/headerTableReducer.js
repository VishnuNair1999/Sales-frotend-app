// Import your action types
import {
  UPDATE_VR_NO,
  UPDATE_VR_DATE,
  UPDATE_AC_NAME,
  UPDATE_AC_AMT,
  UPDATE_STATUS,
 
} from '../actions/actionType'; // Make sure you have actionTypes file with these constants

const initialState = {
  vr_no: '',
  vr_date: '',
  ac_name: '',
  ac_amt: '',
  status: '',
  rows: [],
};

const headerTableReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case UPDATE_VR_NO:
      return {
        ...state,
        vr_no: action.payload,
      };
    case UPDATE_VR_DATE:
      return {
        ...state,
        vr_date: action.payload,
      };
    case UPDATE_AC_NAME:
      return {
        ...state,
        ac_name: action.payload,
      };
    case UPDATE_AC_AMT:
      return {
        ...state,
        ac_amt: action.payload,
      };
    case UPDATE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    

    default:
      return state;
  }
};

export default headerTableReducer;
