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
  const { restaurantes = [], resetContext } = useRestauranteContext();
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [modalRestauranteVisible, setModalRestauranteVisible] = useState(false);
  const [modalProductVisible, setModalProductVisible] = useState(false);

  React.useEffect(() => {
    if (restaurantes.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(restaurantes[0].id);
    }
  }, [restaurantes]);

  const admin = user?.tipo === 'admin';

  const selectedRest = Array.isArray(restaurantes) ? restaurantes.find((rest: Restaurante) => rest.id === selectedRestaurant) : undefined;
  const filteredItems = selectedRest && Array.isArray(selectedRest.produtos) ? selectedRest.produtos : [];

  return (
    <View style={styles.container}>
      <ModalRestaurante
        visible={modalRestauranteVisible}
        onClose={() => setModalRestauranteVisible(false)}
        onCreated={id => setSelectedRestaurant(id)}
      />
      <ModalProduct
        visible={modalProductVisible}
        onClose={() => setModalProductVisible(false)}
        restauranteId={selectedRestaurant}
      />
      <View style={styles.menuItemselect}>
        <View style={{ borderRadius: 8, overflow: 'hidden', width: admin ? '85%' : '100%' }}>
          <Picker
            selectedValue={selectedRestaurant}
            onValueChange={setSelectedRestaurant}
            style={styles.ButtomWhite}
          >
            {Array.isArray(restaurantes) && restaurantes.length > 0 && restaurantes.map(rest => (
              <Picker.Item key={rest.id} label={rest.nome} value={rest.id}/>
            ))}
          </Picker>
        </View>
        {admin && (
          <ThemeButton
            title="+"
            type="black"
            onPress={() => setModalRestauranteVisible(true)}
            style={{ width: 50, height: 50, marginLeft: 8 }}
          />
        )}
      </View>

      <ScrollView>
        {Array.isArray(filteredItems) && filteredItems.map(item => (
          <View key={item.id} style={styles.menuItem}>
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
              <Text style={styles.menuItemPrice}>{item.preco}</Text>
            </View>
          </View>
        ))}
        <View style={styles.TextPadding}>
          {admin && (
            <View>
              <ThemeButton
                title="Adicionar Produto"
                type="black"
                onPress={() => setModalProductVisible(true)}
              />
              <ThemeButton
                title="Resetar Contexto"
                type="black"
                style={{ marginTop: 10 }}
                onPress={resetContext}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;