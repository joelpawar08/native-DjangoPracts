import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000';

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const renderTask = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>Completed: {item.completed ? 'Yes' : 'No'}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="delete" onPress={() => deleteTask(item.id)} />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item.id.toString()} />
      <Button mode="contained" onPress={() => navigation.navigate('TaskDetail', { task: null })} style={styles.addButton}>
        Add Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  card: { marginBottom: 10 },
  addButton: { margin: 10 },
});