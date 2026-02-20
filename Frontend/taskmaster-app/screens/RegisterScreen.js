import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000';  // Update to your backend URL (use ngrok for mobile testing)

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = async () => {
    try {
      await axios.post(`${API_URL}/register`, { username, password });
      navigation.navigate('Login');
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Create Account</Title>
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
      <Button mode="contained" onPress={register} style={styles.button}>Register</Button>
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <Button onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
});