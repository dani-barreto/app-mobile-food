import { ThemeButton } from '@/src/components/Button/Button';
import { products } from '@/src/types/produto';
import { restaurants } from '@/src/types/restaurante';
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
  const [selectedRestaurant, setSelectedRestaurant] = useState(1);

  const filteredItems = products.filter(item => item.restaurantId === selectedRestaurant);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedRestaurant}
        onValueChange={setSelectedRestaurant}
        style={{ marginBottom: 16, borderColor: '#000', borderWidth: 2, borderRadius: 8 }}
      >
        {restaurants.map(rest => (
          <Picker.Item key={rest.id} label={rest.nome} value={rest.id} />
        ))}
      </Picker>

      <ScrollView>
        {filteredItems.map(item => (
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
          <ThemeButton
            title="Adicionar Produto"
            type="black"
            onPress={() => { /* ação de adicionar produto */ }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;