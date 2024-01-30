import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import headerTableReducer from './reducers/headerTableReducer';
import detailTableReducer from './reducers/detailTableReducer';

const rootReducer = combineReducers({
  headerTable: headerTableReducer,
  detailTable: detailTableReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
