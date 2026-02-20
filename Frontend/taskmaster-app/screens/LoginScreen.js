import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      await AsyncStorage.setItem('token', response.data.access_token);
      navigation.navigate('TaskList');
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome Back</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={login} style={styles.button}>Log In</Button>
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <Button onPress={() => navigation.navigate('Register')}>No account? Sign up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
});
