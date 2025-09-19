
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador((prev: number) => prev + 1);
    
  };
  
   const decrementar =() =>{
    setContador((prev: number) => prev - 1 );
   
   }
  

  return (
    <View>
      <Text style = {styles.viewContador}>
        Contador: {contador}
      </Text>
      <View style={styles.container} >
      <Pressable  onPress={incrementar} >
          <Text style= {styles.viewDecrementar}>incrementar</Text>
      </Pressable>
      <Pressable onPress={decrementar}>
        <Text style= {styles.viewDecrementar}>decrementar</Text>
      </Pressable>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContador: {
    backgroundColor: '#d57cb6ff', 
    color: '#e8e6b1ff',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center', // <-- centra el texto horizontalmente
    padding: 10, // opcional para mejor apariencia
  },
  viewIncrementar: {
    backgroundColor: '#8d1d68ff',
    color: 'white',
    fontSize: 15,
    padding: 15,
    margin: 10,
    borderRadius: 10, // borde curvo
  },
  viewDecrementar: {
    backgroundColor: '#8d1d68ff',
    color: 'white',
    
    fontSize: 15,
    padding: 15,
    margin: 10,
    fontWeight: '500',
    borderRadius: 10, // borde curvo
  }
})



