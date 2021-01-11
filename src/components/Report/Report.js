import React, {useEffect, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import APIManager from '../../api/APIManager';
import {PieChart} from 'react-native-chart-kit';
import {AuthContext} from '../../hoc/AuthContext/AuthContext';
import {trackPromise} from 'react-promise-tracker';
import {Card} from 'react-native-paper';

const screenWidth = Dimensions.get('window').width - 16;

const Report = (props) => {
  const [tasks, setTasks] = React.useState([]);
  const authContext = React.useContext(AuthContext);

  const getTasks = useCallback(() => {
    trackPromise(
      APIManager(
        'GET',
        '/api/reports',
        {},
        authContext ? authContext.token : '',
      ),
    )
      .then((response) => {
        setTasks(response);
      })
      .catch(() => {});
  }, [authContext]);

  useEffect(() => {
    if (props.index === 0) {
      getTasks();
    }
  }, [getTasks, props.index]);

  const pendingTasks = tasks.length > 0 ? tasks[0]?.pending_tasks : 0;
  const completedTasks = tasks.length > 0 ? tasks[0]?.completed_tasks : 0;
  const pendingPoints =
    tasks.length > 0
      ? tasks[0].pending_points
        ? tasks[0].pending_points
        : 0
      : 0;
  const CompletePoints =
    tasks.length > 0
      ? tasks[0]?.completed_points
        ? tasks[0]?.completed_points
        : 0
      : 0;
  const TotalUsers =
    tasks.length > 0
      ? tasks[0]?.total_users === 0
        ? 0
        : tasks[0]?.total_users
      : 0;

  const pointsData = [
    {
      name: 'Pending',
      taskCount: pendingPoints,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
    {
      name: 'Completed',
      taskCount: CompletePoints,
      color: 'rgb(12,196,43)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
  ];
  const taskData = [
    {
      name: 'Pending',
      taskCount: pendingTasks,
      color: '#f4af00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
    {
      name: 'Completed',
      taskCount: completedTasks,
      color: '#0091f4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={getTasks} />
      }>
      <Card>
        <Card.Content>
          <View style={styles.container}>
            <Text style={styles.points}>
              {`Total Points :${pendingPoints + CompletePoints}`}
            </Text>
            <PieChart
              data={pointsData}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={styles.pieChart}
              accessor="taskCount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
            <Text style={styles.points}>
              Total Tasks : {`${pendingTasks + completedTasks}`}
            </Text>
            <PieChart
              data={taskData}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={styles.pieChart}
              accessor="taskCount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </Card.Content>
        <Card.Actions>
          {TotalUsers > 0 ? (
            <Text style={styles.users}> Tasks of {TotalUsers} users</Text>
          ) : null}
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  pieChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  points: {
    fontSize: 20,
    textAlign: 'center',
  },
  users: {
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#0091f4',
  },
});

export default Report;
