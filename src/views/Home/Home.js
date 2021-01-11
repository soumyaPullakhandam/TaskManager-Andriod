import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import UserTasks from '../../components/UserTasks/UserTasks';
import {BottomNavigation, Colors, IconButton, Title} from 'react-native-paper';
import Report from '../../components/Report/Report';
import {AuthContext} from '../../hoc/AuthContext/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navTab: {
    backgroundColor: '#0091f4',
  },
  headerTitle: {color: '#fff', marginTop: 6},
});

const Home = ({navigation}, props) => {
  const [index, setIndex] = useState(0);
  const authContext = useContext(AuthContext);
  const [routes] = React.useState([
    {key: 'report', title: 'Report', icon: 'table'},
    {key: 'pending', title: 'Pending Tasks', icon: 'clock'},
    {key: 'completed', title: 'Completed Tasks', icon: 'check'},
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Title style={{color: '#fff'}}>Dashboard</Title>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Title style={styles.headerTitle}>
            {`Hi ${authContext?.user?.username} !`}
          </Title>
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
        </View>
      ),
    });
    const unsubscribe = navigation.addListener('focus', async () => {});
    return unsubscribe;
  }, [authContext, navigation, props]);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'pending':
        return (
          <UserTasks
            jumpTo={jumpTo}
            navigation={navigation}
            index={index}
            completed={2}
          />
        );
      case 'completed':
        return (
          <UserTasks
            jumpTo={jumpTo}
            navigation={navigation}
            index={index}
            completed={1}
          />
        );
      case 'report':
        return <Report jumpTo={jumpTo} index={index} navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomNavigation
        barStyle={styles.navTab}
        navigationState={{index, routes}}
        onIndexChange={(i) => {
          setIndex(i);
        }}
        renderScene={renderScene}
      />
    </SafeAreaView>
  );
};

export default Home;
