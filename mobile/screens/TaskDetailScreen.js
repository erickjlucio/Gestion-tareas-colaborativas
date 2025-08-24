import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Linking, Alert } from 'react-native';
import { api } from '../api';

export default function TaskDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('pending');
  const [comment, setComment] = useState('');

  useEffect(() => { load(); }, [id]);
  const load = async () => {
    const t = await api.getTask(id);
    setTask(t);
    setStatus(t.status);
  };

  const save = async () => { await api.updateTask(id, { status }); await load(); };
  const addComm = async () => {
    try { await api.addComment(id, comment); setComment(''); await load(); }
    catch (e) { Alert.alert('Error', e.message); }
  };

  if (!task) return <View style={{ padding:16 }}><Text>Cargando…</Text></View>;

  const API_URL = process.env.API_URL || "http://10.0.2.2:4000"; // fallback
  const fileUrl = task.attachmentPath ? `${API_URL}/${task.attachmentPath}` : null;

  const openFile = () => {
    if (fileUrl) Linking.openURL(fileUrl);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>Vence: {task.dueDate || '—'}</Text>
      <Text>Estado actual: {task.status}</Text>
      <View style={{ height: 8 }} />
      <Text>Nuevo estado:</Text>
      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between', marginVertical: 8 }}>
        <Button title="Pendiente" onPress={() => setStatus('pending')} />
        <Button title="En progreso" onPress={() => setStatus('in_progress')} />
        <Button title="Completada" onPress={() => setStatus('completed')} />
      </View>
      <Button title="Guardar" onPress={save} />
      <View style={{ height: 12 }} />

    {fileUrl && (
      <View>
      <Text>Adjunto: </Text>
      <Button title="Abrir adjunto" onPress={openFile} />
      </View>
    )}

      <View style={{ height: 12 }} />
      <Text style={{ fontWeight: 'bold' }}>Comentarios</Text>
      {task.comments?.map(c => (
        <Text key={c.id}>• {c.content}</Text>
      ))}
      <TextInput value={comment} onChangeText={setComment} placeholder="Escribe un comentario" style={{ borderWidth:1, padding:8, marginVertical:8 }} />
      <Button title="Agregar comentario" onPress={addComm} />
    </View>
  );
}
