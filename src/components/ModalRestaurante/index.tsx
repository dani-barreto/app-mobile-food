import { useRestauranteContext } from '@/src/context/RestauranteContext';
import { Restaurante } from '@/src/types/restaurante';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ModalRestauranteProps {
  visible: boolean;
  onClose: () => void;
  onCreated?: (id: string) => void;
}

const ModalRestaurante: React.FC<ModalRestauranteProps> = ({ visible, onClose, onCreated }) => {
  const { restaurantes, setRestaurantes } = useRestauranteContext();
  const [novoRestaurante, setNovoRestaurante] = useState({
    nome: '',
    endereco: '',
    cnpj: '',
    latitude: '',
    longitude: '',
  });

  const handleSave = async () => {
    if (!novoRestaurante.nome || !novoRestaurante.endereco || !novoRestaurante.cnpj) return;
    const novo: Restaurante = {
      id: (restaurantes.length + 1).toString(),
      ...novoRestaurante,
      produtos: []
    };
    await setRestaurantes([...restaurantes, novo]);
    setNovoRestaurante({ nome: '', endereco: '', cnpj: '', latitude: '', longitude: '' });
    onClose();
    if (onCreated) onCreated(novo.id);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '85%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Novo Restaurante</Text>
          <TextInput placeholder="Nome" value={novoRestaurante.nome} onChangeText={v => setNovoRestaurante(r => ({ ...r, nome: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <TextInput placeholder="Endereço" value={novoRestaurante.endereco} onChangeText={v => setNovoRestaurante(r => ({ ...r, endereco: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <TextInput placeholder="CNPJ" value={novoRestaurante.cnpj} onChangeText={v => setNovoRestaurante(r => ({ ...r, cnpj: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <TextInput placeholder="Latitude" value={novoRestaurante.latitude} onChangeText={v => setNovoRestaurante(r => ({ ...r, latitude: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <TextInput placeholder="Longitude" value={novoRestaurante.longitude} onChangeText={v => setNovoRestaurante(r => ({ ...r, longitude: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
            <TouchableOpacity onPress={onClose} style={{ marginRight: 16 }}>
              <Text style={{ color: '#2563EB' }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRestaurante;
