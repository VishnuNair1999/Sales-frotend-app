import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HeaderTable from './components/HeaderTable';
import DetailTable from './components/DetailTable';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HeaderTable />
        <DetailTable />
      </div>
    </Provider>
  );
}

export default App;