import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface PerfilProps {
  initialNombre?: string;
}

export default function Perfil({ initialNombre}: PerfilProps) {
  // Nombre completo mostrado en el perfil
  const [nombreCompleto, setNombreCompleto] = useState(initialNombre);

  // Estado del modal y del input
  const [visible, setVisible] = useState(false);
  const [draftNombre, setDraftNombre] = useState('');

  const abrirModal = () => {
    setDraftNombre(''); 
    setVisible(true);
  };

  const guardar = () => {
    const valor = draftNombre.trim();
    if (valor.length === 0) return; // impedimos guardar vacío
    setNombreCompleto(valor);
    setVisible(false);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Perfil Actual</Text>
      <Text style={styles.nombre}>{nombreCompleto}</Text>

      <Pressable style={styles.buton} onPress={abrirModal}>
        <Text style={styles.btnText}>Cambiar nombre</Text>
      </Pressable>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Editar nombre</Text>

            <TextInput
              value={draftNombre}
              onChangeText={setDraftNombre}
              placeholder="Nombre y Apellido"
              autoFocus
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={guardar}
            />

            <View style={styles.row}>
              <Pressable style={[styles.buton, styles.btnCancelar]} onPress={() => setVisible(false)}>
                <Text style={[styles.btnText, styles.btnTextCancelar]}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.buton,
                  draftNombre.trim().length === 0 && styles.btnDeshabilitado,
                ]}
                onPress={guardar}
              >
                <Text style={styles.btnText}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#c5c5baff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  nombre: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  buton: {
    backgroundColor: '#8d1d68ff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140 ,
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
  },
  btnCancelar: {
    backgroundColor: '#e5e7eb',
  },
  btnTextCancelar: {
    color: '#111827',
  },
  btnDeshabilitado: {
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#edecceff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
});
