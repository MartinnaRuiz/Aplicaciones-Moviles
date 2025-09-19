import React, { useMemo, useState } from 'react';
import {
    FlatList, Image,
    ImageSourcePropType,
    Modal, Pressable, StyleSheet,
    Text, TextInput, View
} from 'react-native';

type Product = {
  id: string;
  title: string;
  price: number;
  image: ImageSourcePropType;
  description: string;
};

const SWEATER = require('@/assets/images/sweter.jpeg');

const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Sweter',
    price: 70000,
    image: SWEATER,
    description: 'Sweter de algodón suave, ideal para media estación.',
  },
  {
    id: '2',
    title: 'Zapatillas',
    price: 129999,
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5PNXJi_EbdTIBNKnnvRzDwVgnGzJmF7osA&s' },
    description: 'Zapatillas urbanas livianas con suela antideslizante.',
  },
  {
    id: '3',
    title: 'Mochila',
    price: 55999,
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnq0KG7uby5-ww--EjYyItSFMkmNwhne_yBg&s' },
    description: 'Mochila resistente al agua con múltiples compartimentos.',
  },
];

// Etiquetas para los modos de imagen del modal
const MODE_OPTIONS: { mode: 'cover' | 'contain' | 'stretch'; label: string }[] = [
  { mode: 'cover',   label: 'Llenar'   },
  { mode: 'contain', label: 'Encajar'  },
  { mode: 'stretch', label: 'Estirar'  },
];

export default function Galeria() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [mode, setMode] = useState<'cover' | 'contain' | 'stretch'>('cover');

  // favoritos por ID 
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p => p.title.toLowerCase().includes(q));
  }, [query]);

  const closeModal = () => setSelected(null);

  return (
    <View style={styles.screen}>
      {/* Filtro */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por título…"
        style={styles.search}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {/* Lista */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        renderItem={({ item }) => {
          const isFav = favorites.has(item.id);
          return (
            <Pressable
              style={[styles.card, isFav && styles.cardFav]}
              onPress={() => { setSelected(item); setMode('cover'); }} // abre modal y resetea modo
              onLongPress={() => toggleFavorite(item.id)}              // long-press: favorito
              delayLongPress={400}
              android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
            >
              {/* Estrella de favorito */}
              <Text style={[styles.favIcon, isFav && styles.favIconActive]}>
                {isFav ? '★' : '☆'}
              </Text>

              <Image source={item.image} style={styles.thumb} resizeMode="cover" />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toLocaleString('es-AR')}</Text>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>No hay resultados para “{query}”.</Text>}
      />

      {/* Modal de detalle */}
      <Modal
        visible={!!selected}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <Image source={selected.image} style={styles.bigImage} resizeMode={mode} />
                <Text style={styles.modalTitle}>{selected.title}</Text>
                <Text style={styles.modalDesc}>{selected.description}</Text>

                {/* Botones de modo */}
                <View style={styles.modeRow}>
                  {MODE_OPTIONS.map(({ mode: m, label }) => (
                    <Pressable
                      key={m}
                      onPress={() => setMode(m)}
                      style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
                      accessibilityRole="button"
                      accessibilityLabel={`Cambiar a ${label}`}
                    >
                      <Text style={[styles.modeText, mode === m && styles.modeTextActive]}>
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable onPress={closeModal} style={styles.closeBtn}>
                  <Text style={styles.closeText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12 },
  search: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  listContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 16 },
  card: {
    width: 200,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 3,
  },
  // favorito: borde destacado
  cardFav: {
    borderWidth: 2,
    borderColor: '#8d1d68ff',
  },
  //ícono de favorito
  favIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    fontSize: 18,
    color: '#9ca3af', // gris cuando NO es favorito
  },
  favIconActive: {
    color: '#8d1d68ff', // color cuando SÍ es favorito
  },

  thumb: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#e5e7eb' },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  price: { marginTop: 2, fontWeight: '600', color: '#374151' },
  empty: { marginTop: 24, color: '#6b7280' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  bigImage: { width: '100%', height: 260, borderRadius: 12, backgroundColor: '#e5e7eb' },
  modalTitle: { marginTop: 12, fontSize: 18, fontWeight: '800', color: '#111827' },
  modalDesc: { marginTop: 6, fontSize: 14, color: '#374151' },

  // Botones de resizeMode
  modeRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  modeBtn: {
    paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: 10, backgroundColor: '#f3f4f6',
  },
  modeBtnActive: { backgroundColor: '#8d1d68ff' },
  modeText: { fontWeight: '700', color: '#111827' },
  modeTextActive: { color: 'white' },

  closeBtn: {
    marginTop: 14,
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#8d1d68ff',
  },
  closeText: { color: 'white', fontWeight: '700' },
});
