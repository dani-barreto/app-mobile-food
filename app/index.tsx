
import React from 'react';
import { StatusBar } from 'expo-status-bar';

// O caminho correto agora que você informou a pasta "src"
import { Routes } from '../src/routes';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  );
}