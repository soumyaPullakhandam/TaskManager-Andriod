import React from 'react';
import {usePromiseTracker} from 'react-promise-tracker';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
const Tracker = (props) => {
  const {promiseInProgress} = usePromiseTracker();

  return (
    <>
      <Spinner
        visible={promiseInProgress === true}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </>
  );
};
export default Tracker;
