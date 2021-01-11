/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Tracker from './src/hoc/Tracker/Tracker';
import Routes from './src/Routes/Routes';

const App: () => React$Node = () => {
  return (
    <>
      <Tracker />
      <Routes />
    </>
  );
};

export default App;
