import React, {useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import APIManager from '../../api/APIManager';
import {AuthContext} from '../../hoc/AuthContext/AuthContext';
import {TextInput as XTextInput, Snackbar} from 'react-native-paper';
import {trackPromise} from 'react-promise-tracker';
import Logo from '../../assets/note.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  inpFields: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
  },
  gaps: {
    height: 20,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const Task = ({route, navigation}, props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [message] = React.useState('Please enter valid credentials');
  const authContext = React.useContext(AuthContext);
  const onDismissSnackBar = () => setVisible(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setUsername('');
      setPassword('');
    });
    return unsubscribe;
  }, [authContext.token, navigation]);

  const onLogin = async () => {
    const response = await trackPromise(
      APIManager('POST', '/auth/login/', {
        username: username,
        email: `${username}@gmail.com`,
        password: password,
      }),
    );
    if (response?.key) {
      // localStorage.setItem('token', response.key);
      authContext.token = response.key;
      authContext.user = response.user;
      navigation.navigate('UserHome');
    }
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
      <XTextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.gaps} />
      <XTextInput
        secureTextEntry={true}
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.gaps} />
      <Button onPress={onLogin} title="Login" color="#0091f4" />
    </View>
  );
};

export default Task;
