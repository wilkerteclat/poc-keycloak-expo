import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage(''); // Limpa erro anterior

    const formData = new URLSearchParams();
    formData.append('client_id', 'expo-client');
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);

    const keycloakHost = Platform.OS === 'web'
      ? 'http://localhost:8080'
      : 'http://192.168.15.4:8080';

    try {
      const response = await fetch(`${keycloakHost}/realms/demo/protocol/openid-connect/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        router.push('/home');
      } else {
        const error = data.error_description || data.error || 'Erro desconhecido';
        setErrorMessage(`Erro: ${error}`);
      }
    } catch (error: any) {
      setErrorMessage(`Erro de rede: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login com Keycloak</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});
