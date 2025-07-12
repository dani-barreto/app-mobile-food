import { useRestauranteContext } from '@/src/context/RestauranteContext';
import { Produto } from '@/src/types/produto';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ModalProductProps {
  visible: boolean;
  onClose: () => void;
  restauranteId: string;
}

const ModalProduct: React.FC<ModalProductProps> = ({ visible, onClose, restauranteId }) => {
  const { getRestauranteById, setProdutos } = useRestauranteContext();
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
  });

  const handleSave = async () => {
    if (!novoProduto.nome || !novoProduto.preco) return;
    const restaurante = getRestauranteById(restauranteId);
    console.log('restauranteId:', restauranteId);
    console.log('Restaurante:', restaurante);
    if (!restaurante) return;
    const novo: Produto = {
      id: (restaurante.produtos.length + 1).toString(),
      ...novoProduto
    };
    await setProdutos(restauranteId, [...restaurante.produtos, novo]);
    setNovoProduto({ nome: '', descricao: '', preco: '', imagem: '' });
    onClose();
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
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Novo Produto</Text>
          <TextInput placeholder="Nome" value={novoProduto.nome} onChangeText={v => setNovoProduto(p => ({ ...p, nome: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <TextInput placeholder="Descrição" value={novoProduto.descricao} onChangeText={v => setNovoProduto(p => ({ ...p, descricao: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <TextInput placeholder="Preço" value={novoProduto.preco} onChangeText={v => setNovoProduto(p => ({ ...p, preco: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          <TextInput placeholder="URL da Imagem" value={novoProduto.imagem} onChangeText={v => setNovoProduto(p => ({ ...p, imagem: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
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

export default ModalProduct;
