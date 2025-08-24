import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api, saveAuth } from '../api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    try {
      const { token, user } = await api.register(name, email, password, 'user');
      await saveAuth(token, user);
      navigation.replace('Tasks');
    } catch (e) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 8 }}>Registro</Text>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <Button title="Crear cuenta" onPress={onRegister} />
    </View>
  );
}
