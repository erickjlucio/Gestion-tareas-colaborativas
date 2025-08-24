import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api, saveAuth } from '../api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      const { token, user } = await api.login(email, password);
      await saveAuth(token, user);
      navigation.replace('Tasks');
    } catch (e) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 8 }}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <Button title="Entrar" onPress={onLogin} />
      <View style={{ height: 8 }} />
      <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
