import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View} from 'react-native';
import {DataTable, Paragraph, Text, Title} from 'react-native-paper';
import {AuthContext} from '../../hoc/AuthContext/AuthContext';
import APIManager from '../../api/APIManager';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    padding: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0a2e56',
  },
  content: {
    fontSize: 18,
  },
  descTitle: {
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  description: {
    paddingLeft: 15,
    paddingBottom: 10,
    borderStyle: 'solid',
    borderColor: '#3d3e3e',
    borderWidth: 2,
    margin: 12,
  },
  taskTitle: {
    textAlign: 'center',
  },
  status1: {
    color: '#F00',
  },
  status2: {
    color: 'rgb(12,196,43)',
  },
});
export default function TaskDetails(props) {
  const authContext = React.useContext(AuthContext);
  const task = props.params;
  const [details, setDetails] = useState({
    author_name: '',
    completed: 1,
    created_date: '2020-12-11T15:53:07Z',
    description: 'desc',
    id: 20,
    points: 0,
    title: '',
    user: 2,
    username: '',
  });

  useEffect(() => {
    const getTasks = async () => {
      const res = await APIManager(
        'GET',
        '/api/task/' + task,
        {},
        authContext ? authContext.token : '',
      );
      if (res) {
        setDetails(res);
      }
    };
    getTasks();
  }, [authContext, task]);

  return (
    <View style={styles.container}>
      <Title style={styles.taskTitle}>{details.title}</Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title />
          <DataTable.Title numeric />
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Author</DataTable.Cell>
          <DataTable.Cell numeric>{details.author_name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Status</DataTable.Cell>
          <DataTable.Cell numeric>
            <Text
              style={details.completed === 1 ? styles.status2 : styles.status1}>
              {details.completed === 1 ? 'Completed' : 'Pending'}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Created On</DataTable.Cell>
          <DataTable.Cell numeric>
            {new Date(details.created_date.toString()).toDateString()}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Points</DataTable.Cell>
          <DataTable.Cell numeric>{details.points}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <Text style={styles.descTitle}>Description</Text>
      <ScrollView style={styles.description}>
        <Paragraph>{details.description}</Paragraph>
      </ScrollView>
    </View>
  );
}
