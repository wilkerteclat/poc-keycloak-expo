import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    // Aqui você pode limpar tokens se estiver armazenando
    router.replace('/login'); // Redireciona para login e remove do histórico
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Bem-vindo!</Text>
      <Text style={styles.subtitle}>Você está logado com sucesso via Keycloak.</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { marginBottom: 20, fontSize: 16, textAlign: 'center' },
});
