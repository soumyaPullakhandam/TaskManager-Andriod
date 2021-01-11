import React, {useContext, useEffect} from 'react';
import TaskDetails from '../../components/TaskDetails/TaskDetails';
import {Colors, IconButton, Title} from 'react-native-paper';
import {AuthContext} from '../../hoc/AuthContext/AuthContext';

export default function Task({route, navigation}) {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Title style={{color: '#fff'}}>Task Details</Title>,
      headerRight: () => (
        <IconButton
          icon="logout"
          color={Colors.white}
          size={20}
          onPress={async () => {
            authContext.token = '';
            authContext.user = {};
            navigation.navigate('/');
          }}
        />
      ),
    });
  }, [authContext, navigation]);
  const {task} = route.params;
  return <TaskDetails params={task} />;
}
