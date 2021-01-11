import React, {useCallback, useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import APIManager from '../../api/APIManager';
import {Colors, DataTable, IconButton, Searchbar} from 'react-native-paper';
import {AuthContext} from '../../hoc/AuthContext/AuthContext';
import {trackPromise} from 'react-promise-tracker';

const UserTasks = (props) => {
  const [value, setValue] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  const [mainTasks, setMainTasks] = React.useState([]);
  const oNavigation = props.navigation;
  const {completed} = props;
  const authContext = React.useContext(AuthContext);
  const isAdmin = authContext?.user?.is_staff;

  const getTask = useCallback(() => {
    trackPromise(
      APIManager(
        'GET',
        '/api/task?completed=' + completed,
        {},
        authContext ? authContext.token : '',
      ),
    )
      .then((res) => {
        setTasks(res);
        setMainTasks(res);
      })
      .catch(() => {});
  }, [authContext, completed]);

  useEffect(() => {
    if (props.index === 1 && completed === 2) {
      getTask();
    } else if (props.index === 2 && completed === 1) {
      getTask();
    }
  }, [completed, getTask, props.index]);

  const onComplete = async (currentTask) => {
    const res = await trackPromise(
      APIManager(
        'PATCH',
        `/api/task/${currentTask}`,
        {
          completed: 1,
        },
        authContext ? authContext.token : '',
      ),
    );
    if (res) {
      getTask();
    }
  };

  const myTasks =
    tasks.length > 0
      ? tasks.map((item) => {
          return (
            <DataTable.Row
              key={item.id}
              onPress={() => {
                oNavigation.navigate('Task', {
                  task: item.id,
                });
              }}>
              <DataTable.Cell>{item.title}</DataTable.Cell>
              {isAdmin ? (
                <DataTable.Cell numeric>
                  <Text>{item.username}</Text>
                </DataTable.Cell>
              ) : null}
              <DataTable.Cell numeric>
                <Text>{item.points}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {completed === 2 && !isAdmin ? (
                  <IconButton
                    icon="check"
                    style={styles.complete}
                    color={Colors.white}
                    size={20}
                    onPress={async () => {
                      await onComplete(item.id);
                    }}
                  />
                ) : null}
                <Text> </Text>
                <IconButton
                  icon="launch"
                  style={styles.nav}
                  color={Colors.white}
                  size={20}
                  onPress={() => {
                    oNavigation.navigate('Task', {
                      task: item.id,
                    });
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })
      : null;

  const onSearch = React.useCallback(
    (text) => {
      const filteredList = tasks.filter((item) => {
        return item.title.toLowerCase().search(text.toLowerCase()) != -1;
      });
      setTasks(text !== '' ? filteredList : mainTasks);
    },
    [mainTasks, tasks],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => {
          setValue(text);
          onSearch(text);
        }}
        value={value}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getTask} />
        }>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tasks</DataTable.Title>
            {isAdmin ? (
              <DataTable.Title numeric>Assigned To</DataTable.Title>
            ) : null}
            <DataTable.Title numeric>Points</DataTable.Title>
            <DataTable.Title numeric>Actions</DataTable.Title>
          </DataTable.Header>
          {myTasks}
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'rgba(239,245,245,0.55)',
    height: 80,
    alignItems: 'baseline',
    marginVertical: 5,
    marginHorizontal: 16,
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 0.5,
  },
  action: {
    flex: 0.2,
  },
  searchBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  complete: {
    backgroundColor: 'rgb(12,196,43)',
  },
  nav: {
    backgroundColor: '#0091f4',
  },
  status1: {
    color: '#F00',
    fontSize: 12,
  },
  status2: {
    color: 'rgb(12,196,43)',
    fontSize: 12,
  },
});

export default UserTasks;
