import { useRestauranteContext } from '@/src/context/RestauranteContext';
import { Restaurante } from '@/src/types/restaurante';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ModalRestauranteProps {
  visible: boolean;
  onClose: () => void;
  onCreated?: (id: string) => void;
  restauranteId?: string;
}

const ModalRestaurante: React.FC<ModalRestauranteProps> = ({ visible, onClose, onCreated, restauranteId }) => {
  const { restaurantes, setRestaurantes, getRestauranteById } = useRestauranteContext();
  const [novoRestaurante, setNovoRestaurante] = useState<Restaurante>({
    id: '',
    nome: '',
    endereco: '',
    cnpj: '',
    latitude: '',
    longitude: '',
    produtos: []
  });

  React.useEffect(() => {
    if (visible && restauranteId) {
      const rest = getRestauranteById(restauranteId);
      if (rest) {
        setNovoRestaurante({
          id: rest.id,
          nome: rest.nome,
          endereco: rest.endereco,
          cnpj: rest.cnpj,
          latitude: rest.latitude,
          longitude: rest.longitude,
          produtos: rest.produtos ?? []
        });
      }
    } else {
      setNovoRestaurante({ id: '', nome: '', endereco: '', cnpj: '', latitude: '', longitude: '', produtos: [] });
    }
  }, [visible, restauranteId]);

  const handleSave = async () => {
    if (!novoRestaurante.nome || !novoRestaurante.endereco || !novoRestaurante.cnpj) return;
    if (restauranteId) {
      const novosRestaurantes = restaurantes.map(rest =>
        rest.id === restauranteId ? { ...rest, ...novoRestaurante } : rest
      );
      await setRestaurantes(novosRestaurantes);
      onClose();
    } else {
      const { id, ...restauranteData } = novoRestaurante;
      const novo: Restaurante = {
        id: (restaurantes.length + 1).toString(),
        ...restauranteData,
        produtos: []
      };
      await setRestaurantes([...restaurantes, novo]);
      setNovoRestaurante({ id: '', nome: '', endereco: '', cnpj: '', latitude: '', longitude: '', produtos: [] });
      onClose();
      if (onCreated) onCreated(novo.id);
    }
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
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{restauranteId ? 'Editar Restaurante' : 'Novo Restaurante'}</Text>
          {restauranteId && (
            <TextInput
              placeholder="Id"
              value={novoRestaurante.id}
              onChangeText={v => setNovoRestaurante(r => r ? { ...r, id: v } : r)}
              style={{ borderBottomWidth: 1, marginBottom: 8 }}
            />
          )}
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
