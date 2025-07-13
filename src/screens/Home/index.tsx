import { ThemeButton } from '@/src/components/Button';
import ModalProduct from '@/src/components/ModalProduct';
import ModalRestaurante from '@/src/components/ModalRestaurante';
import { useAuth } from '@/src/context/AuthContext';
import { useRestauranteContext } from '@/src/context/RestauranteContext';
import { Restaurante } from '@/src/types/restaurante';
import { Picker } from '@react-native-picker/picker'; // Instale: expo install @react-native-picker/picker
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View
} from 'react-native';
import styles from './styles';


const HomeScreen = () => {
  const { user } = useAuth();
  const { restaurantes = [], deleteRestaurantes, deleteProdutos, getRestauranteByName, setProdutos } = useRestauranteContext();
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [modalRestauranteVisible, setModalRestauranteVisible] = useState<boolean>(false);
  const [modalProductVisible, setModalProductVisible] = useState(false);

  React.useEffect(() => {
    if (restaurantes.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(restaurantes[0].id);
    }
  }, [restaurantes]);

  const admin = user?.tipo === 'admin';

  const selectedRest = Array.isArray(restaurantes) ? restaurantes.find((rest: Restaurante) => rest.id === selectedRestaurant) : undefined;
  const filteredItems = selectedRest && Array.isArray(selectedRest.produtos) ? selectedRest.produtos : [];

  const handleDeleteRestaurant = (id: string) => {
    if (id) {
      deleteRestaurantes(id);
      if (selectedRestaurant === id) {
        setSelectedRestaurant('');
      }
    }
  };

  const handleOpenEditRestaurant = (id: string) => {
    setSelectedRestaurantId(id);
    setModalRestauranteVisible(true);
  };

  const handleOpenCreateRestaurant = () => {
    setSelectedRestaurantId('');
    setModalRestauranteVisible(true);
  };

  const handleOpenCreateProduto = () => {
    setSelectedProductId('');
    setModalProductVisible(true);
  };

  const handleDeleteProduct = (id_restaurante: string, id_produtos: string) => {
    if (id_restaurante && id_produtos) {
      deleteProdutos(id_restaurante, id_produtos);
    }
  };

  const handleOpenEditProduto = (id: string) => {
    setSelectedProductId(id);
    setModalProductVisible(true);
  };

  return (
    <View style={styles.container}>
      <ModalRestaurante
        visible={modalRestauranteVisible}
        onClose={() => setModalRestauranteVisible(false)}
        onCreated={id => setSelectedRestaurant(id)}
        restauranteId={selectedRestaurantId}
      />
      <ModalProduct
        visible={modalProductVisible}
        onClose={() => setModalProductVisible(false)}
        restauranteId={selectedRestaurant}
        productId={selectedProductId}
      />
      <View style={styles.menuItemselect}>
        <View style={{ borderRadius: 8, overflow: 'hidden', width: admin ? '60%' : '100%' }}>
          <Picker
            selectedValue={selectedRestaurant}
            onValueChange={setSelectedRestaurant}
            style={styles.ButtomWhite}
          >
            {Array.isArray(restaurantes) && restaurantes.length > 0 && restaurantes.map(rest => (
              <Picker.Item key={rest.id} label={rest.nome} value={rest.id} style={styles.ButtomTitleWhite}/>
            ))}
          </Picker>
        </View>
        {admin && (
          <View style={{ flexDirection: 'row' }}>
            <ThemeButton
              icon="add"
              type="black"
              onPress={() => handleOpenCreateRestaurant()}
              style={{ width: 45, height: 50, marginLeft: 8 }}
            />
            <ThemeButton
              icon="create"
              type="black"
              onPress={() => handleOpenEditRestaurant(selectedRestaurant)}
              style={{ width: 45, height: 50, marginLeft: 8 }}
            />
            <ThemeButton
              icon="trash"
              type="black"
              onPress={() => handleDeleteRestaurant(selectedRestaurant)}
              style={{ width: 45, height: 50, marginLeft: 8 }}
            />
          </View>
        )}
      </View>

      <ScrollView>
        {Array.isArray(filteredItems) && filteredItems.map(item => (
          <View key={`${selectedRestaurant}-${item.id}`} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={{ uri: item.imagem }}
                style={styles.menuItemImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemName}>{item.nome}</Text>
              <Text style={styles.menuItemDescription}>{item.descricao}</Text>
              <Text>R$ {Number((item.preco || '0').toString().replace(',', '.')).toFixed(2)}</Text> 
              {admin && (
                <View style={styles.menuItemActions}>
                  <ThemeButton
                    icon="create"
                    sizeIcon={20}
                    type="black"
                    onPress={() => handleOpenEditProduto(item.id)}
                    style={{ width: 30, height: 30, marginLeft: 8 }}
                  />
                  <ThemeButton
                    icon="trash"
                    sizeIcon={20}
                    type="black"
                    onPress={() => handleDeleteProduct(selectedRestaurant, item.id)}
                    style={{ width: 30, height: 30, marginLeft: 8 }}
                  />
                </View>
              )}
            </View>
          </View>
        ))}
        <View style={styles.TextPadding}>
          {admin && (
            <View>
              <ThemeButton
                title="Adicionar Produto"
                type="black"
                onPress={() => handleOpenCreateProduto()}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;