
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Item = { id: string; label: string };

const DATA: Item[] = [
  { id: '1', label: 'Soy la tarjeta 1' },
  { id: '2', label: 'Soy la tarjeta 2' },
  { id: '3', label: 'Soy la tarjeta 3' },
  { id: '4', label: 'Soy la tarjeta 4' },
  { id: '5', label: 'Soy la tarjeta 5' },
  
];


type CardProps = {
  text: string;        
};

function Card({ text }: CardProps) {
  const [selected, setSelected]= useState (false);

  const toogle=()=> setSelected(prev=> !prev);
  return (
    <Pressable
      style={[styles.card, selected ? styles.cardSelected : styles.cardUnselected]} onPress={toogle} >
      <Text
        style={[styles.cardText, selected ? styles.cardTextSelected : styles.cardTextUnselected]} >
        {text}
      </Text>
    </Pressable>

  );
}

export default function Index() {
  return (
    <View  style= {styles.screen} >
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

  screen:{
    backgroundColor: '#c5c5baff', 
    justifyContent: "center",
    alignItems: "center",
    flex:1,
  },
  listContent: {
    alignItems: 'center', 
    justifyContent: 'center',
    flexGrow: 1, //fuerza al listContent a expandirse hasta ocupar todo el espacio disponible.
  },
  
  card: {
    width: 250,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center', // centra en vertical
    alignItems: 'center',     // centra en horizontal
    margin: 10,
    elevation: 5,
  },
  cardUnselected: {
    backgroundColor: '#d57cb6ff',
  },
  cardSelected: {
    backgroundColor: '#8d1d68ff',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardTextUnselected: {
    color: 'white',
  },
  cardTextSelected: {
    color: '#e6de96ff',
  },

});
