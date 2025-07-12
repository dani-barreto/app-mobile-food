import { useRestauranteContext } from '@/src/context/RestauranteContext';
import { Produto } from '@/src/types/produto';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ModalProductProps {
  visible: boolean;
  onClose: () => void;
  restauranteId: string;
  productId?: string;
}

const ModalProduct: React.FC<ModalProductProps> = ({ visible, onClose, restauranteId, productId }) => {
  const { getRestauranteById, setProdutos } = useRestauranteContext();
  const [novoProduto, setNovoProduto] = useState<Produto>({
    id: '',
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
  });

  React.useEffect(() => {
    if (visible && productId && restauranteId) {
      const restaurante = getRestauranteById(restauranteId);
      const produto = restaurante?.produtos.find(p => p.id === productId);
      if (produto) {
        setNovoProduto({
          id: produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          imagem: produto.imagem,
        });
    } else if (visible && !productId) {
      setNovoProduto({ id: '', nome: '', descricao: '', preco: '', imagem: '' });
    }
    } else {
      setNovoProduto({ id: '', nome: '', descricao: '', preco: '', imagem: '' });
    }
  }, [visible, productId, restauranteId]);

  const handleSave = async () => {
    if (!novoProduto.nome || !novoProduto.preco) return;
    const restaurante = getRestauranteById(restauranteId);
    if (!restaurante) return;
    if (productId) {
      const novosProdutos = restaurante.produtos.map(p =>
        p.id === productId ? { ...p, ...novoProduto, id: productId } : p
      );
      await setProdutos(restauranteId, novosProdutos);
    } else {
      const { nome, descricao, preco, imagem } = novoProduto;
      const novo: Produto = {
        id: (restaurante.produtos.length + 1).toString(),
        nome,
        descricao,
        preco,
        imagem
      };
      await setProdutos(restauranteId, [...restaurante.produtos, novo]);
    }
    setNovoProduto({ id: '', nome: '', descricao: '', preco: '', imagem: '' });
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
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{productId ? 'Editar Produto' : 'Novo Produto'}</Text>
          {productId && (
            <TextInput placeholder="Id" value={novoProduto.id} onChangeText={v => setNovoProduto(p => ({ ...p, id: v }))} style={{ borderBottomWidth: 1, marginBottom: 8 }} />
          )}
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
