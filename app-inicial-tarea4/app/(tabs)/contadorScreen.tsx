
import { Contador } from '@/componentes/contador';
import { View } from 'react-native';


export default function contador() {
  return (
    <View  
      style={{
      backgroundColor: '#c5c5baff', // cremita
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      }}
    >
      
      <Contador />
    </View>
  );
}