
import Galeria from '@/componentes/galeria';
import { View } from 'react-native';


export default function galeria() {
  return (
    <View
      style={{
        backgroundColor: '#c5c5baff', // cremita
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <Galeria/>
    </View>
  );
}





