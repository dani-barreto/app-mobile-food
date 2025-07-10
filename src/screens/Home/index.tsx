import { ThemeButton } from '@/src/components/Button/Button';
import { Restaurante, restaurantes } from '@/src/types/restaurante';
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
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurantes[0].id);

  const selectedRest = restaurantes.find((rest: Restaurante) => rest.id === selectedRestaurant);
  const filteredItems = selectedRest ? selectedRest.produtos : [];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Picker
          selectedValue={selectedRestaurant}
          onValueChange={setSelectedRestaurant}
          style={{ width: 343, height: 52,flex: 1, borderColor: '#000', borderWidth: 2, borderRadius: 8 }}
        >
          {restaurantes.map(rest => (
        <Picker.Item key={rest.id} label={rest.nome} value={rest.id} />
          ))}
        </Picker>
        <ThemeButton
          title="+"
          type="black"
          onPress={() => { /* ação de adicionar restaurante */ }}
          style={{ width: 50, height: 50, marginLeft: 8 }}
        />
      </View>

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