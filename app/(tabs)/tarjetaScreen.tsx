import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Card from '../../componentes/Tarjeta';

type Item = { id: string; label: string };

const DATA: Item[] = [
  { id: '1', label: 'Soy la tarjeta 1' },
  { id: '2', label: 'Soy la tarjeta 2' },
  { id: '3', label: 'Soy la tarjeta 3' },
  { id: '4', label: 'Soy la tarjeta 4' },
  { id: '5', label: 'Soy la tarjeta 5' },
];

export default function TarjetasScreen() {
  return (
    <View style={styles.screen}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card text={item.label} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#c5c5baff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});