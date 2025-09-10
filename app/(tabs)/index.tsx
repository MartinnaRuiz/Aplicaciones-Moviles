
// npm run start


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.screen}>
      <Text style= {styles.texto}>¡BIENVENIDOS!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#c5c5baff', // cremita
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  texto:{
    color: '#8d1d68ff',
    fontSize: 30,
    fontWeight: '400',
    letterSpacing: 3,
    textAlign: 'center',
    
  }
});






  



