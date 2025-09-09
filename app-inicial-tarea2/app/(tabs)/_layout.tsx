import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const icon_color = '#8d1d68ff'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        //headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: Platform.select({
          android: {
            left: 16,
            right: 16,
            height: 80,
            elevation: 8,    // sombra en Android
            backgroundColor: '#afafa2ff',
          },
         
        }),
        
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{title: 'Inicio',
          tabBarIcon: ({ focused,size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={icon_color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tarjetaScreen"
        options={{
          title: 'Tarjetas',
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={icon_color} />
          ),
        }}
      />
       <Tabs.Screen
        name="contadorScreen"
        options={{
          title: 'Contador',
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={icon_color} />
          ),
        }}
      />
      <Tabs.Screen name="perfilScreen" 
      options={{ 
        title: 'Perfil',
        tabBarIcon: ({focused,size}) => (
          <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={icon_color} />
        )
        
        }} />
    </Tabs>
  );
}
