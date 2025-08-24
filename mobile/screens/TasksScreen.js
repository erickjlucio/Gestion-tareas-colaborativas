import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { api } from '../api';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { load(); const unsub = navigation.addListener('focus', load); return unsub; }, [navigation]);
  const load = async () => setTasks(await api.myTasks());

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { id: item.id })} style={{ padding: 12, borderBottomWidth: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>Estado: {item.status} · Vence: {item.dueDate || '—'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex:1 }}>
      <FlatList data={tasks} keyExtractor={t=>String(t.id)} renderItem={renderItem} />
    </View>
  );
}
