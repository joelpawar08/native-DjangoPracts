import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Checkbox, Title } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params || {};
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [completed, setCompleted] = useState(task ? task.completed : false);

  const saveTask = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = { title, description, completed };
    try {
      if (task) {
        await axios.put(`${API_URL}/tasks/${task.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/tasks/`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Title>{task ? 'Edit Task' : 'New Task'}</Title>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        mode="outlined"
        style={styles.input}
      />
      <Checkbox.Item
        label="Completed"
        status={completed ? 'checked' : 'unchecked'}
        onPress={() => setCompleted(!completed)}
      />
      <Button mode="contained" onPress={saveTask} style={styles.button}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
});