import React from 'react';
// Ajuste o caminho se o seu 'src' estiver em outro lugar
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { Routes } from '../src/routes';

// Componente interno para acessar o contexto depois que o Provider já foi renderizado
function RootLayoutNav() {
  const { loading } = useAuth();

  // Mostra um indicador de carregamento enquanto o contexto verifica o usuário
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Após o carregamento, renderiza seu sistema de rotas manuais
  return <Routes />;
}

// Este é o componente de layout principal que o Expo Router irá renderizar
export default function RootLayout() {
  return (
    // O AuthProvider agora envolve corretamente toda a aplicação
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
