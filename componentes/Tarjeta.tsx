import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type CardProps = {
  text: string;        
};

export default function Card({ text }: CardProps) {
  const [selected, setSelected] = useState(false);

  const toogle = () => setSelected((prev) => !prev);

  return (
    <Pressable
      style={[
        styles.card,
        selected ? styles.cardSelected : styles.cardUnselected,
      ]}
      onPress={toogle}
    >
      <Text
        style={[
          styles.cardText,
          selected ? styles.cardTextSelected : styles.cardTextUnselected,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
