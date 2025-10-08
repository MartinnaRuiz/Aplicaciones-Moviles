import { API_BASE } from '@/src/config'; // <--- NUEVO
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList, Image, ImageSourcePropType, Modal,
  Platform,
  Pressable, StyleSheet, Text, TextInput, View
} from 'react-native';

type ProductDTO = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
};

type Product = {
  id: string;
  title: string;
  price: number;
  image: ImageSourcePropType;
  description: string;
};

const ASSETS: Record<string, any> = {
  'sweter.jpeg': require('@/assets/images/sweter.jpeg'),
  'gorra_negra.jpeg': require ('@/assets/images/gorra_negra.jpeg')
};

export default function Galeria() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [mode, setMode] = useState<'cover' | 'contain' | 'stretch'>('cover');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // data desde API
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // crear: Nuevo producto
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [saving, setSaving] = useState(false);

  async function refetch() {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: ProductDTO[] = await res.json();
      const mapped: Product[] = json.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        image: ASSETS[p.imageUrl] ?? { uri: p.imageUrl },
      }));
      setData(mapped);
    } catch {
      setErrorMsg('No pude cargar productos. ¿IP correcta? ¿Servidor encendido?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refetch(); }, []);

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(p => p.title.toLowerCase().includes(q));
  }, [query, data]);

  // crear producto (POST) 
  async function handleCreate() {
    const priceNumber = Number(newPrice);
    if (!newTitle.trim() || !newDesc.trim() || !newImageUrl.trim() || !Number.isFinite(priceNumber)) {
      alert('Completá título, precio (número), imageUrl y descripción.');
      return;
    }
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          price: priceNumber,
          imageUrl: newImageUrl.trim(), // URL o nombre de asset
          description: newDesc.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }
      // limpiar y recargar lista
      setNewTitle(''); setNewPrice(''); setNewImageUrl(''); setNewDesc('');
      setCreateOpen(false);
      await refetch();
    } catch (e: any) {
      alert(`No se pudo crear: ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.screen}>
      {/* ---- Barra superior con Buscar y Nuevo ---- */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por título…"
          style={[styles.search, { flex: 1 }]}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Pressable onPress={() => setCreateOpen(true)} style={styles.newBtn} android_ripple={{ color: 'rgba(0,0,0,0.06)' }}>
          <Text style={styles.newBtnText}>+ Nuevo</Text>
        </Pressable>
      </View>

      {loading && <Text style={styles.empty}>Cargando…</Text>}
      {!!errorMsg && <Text style={styles.empty}>{errorMsg}</Text>}

      {!loading && !errorMsg && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'android' ? 'on-drag' : 'interactive'}
          refreshing={loading}            // pull-to-refresh
          onRefresh={refetch}             // pull-to-refresh
          renderItem={({ item }) => {
            const isFav = favorites.has(item.id);
            return (
              <Pressable
                style={[styles.card, isFav && styles.cardFav]}
                onPress={() => { setSelected(item); setMode('cover'); }}
                onLongPress={() => toggleFavorite(item.id)}
                delayLongPress={400}
                android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
              >
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
      )}

      {/* Modal de detalle  */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        { }
      </Modal>

      {/* Modal de “Nuevo producto” */}
      <Modal visible={createOpen} animationType="slide" transparent onRequestClose={() => setCreateOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nuevo producto</Text>

            <TextInput style={styles.input} placeholder="Título" value={newTitle} onChangeText={setNewTitle} />
            <TextInput style={styles.input} placeholder="Precio (número)" value={newPrice} onChangeText={setNewPrice} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder='imageUrl (https://… o "sweter.jpeg")' value={newImageUrl} onChangeText={setNewImageUrl} />
            <TextInput style={styles.input} placeholder="Descripción" value={newDesc} onChangeText={setNewDesc} />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
              <Pressable onPress={() => setCreateOpen(false)} style={[styles.btn, { backgroundColor: '#9ca3af' }]}>
                <Text style={styles.btnText}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={handleCreate} disabled={saving} style={[styles.btn, saving && { opacity: 0.6 }]}>
                <Text style={styles.btnText}>{saving ? 'Guardando…' : 'Guardar'}</Text>
              </Pressable>
            </View>
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
  newBtn: {
    backgroundColor: '#8d1d68ff',
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 12,
  },
  newBtnText: { color: 'white', fontWeight: '700' },

  listContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 16 },
  card: {
    width: 200, alignSelf: 'center', backgroundColor: 'white',
    borderRadius: 14, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 3,
  },
  cardFav: { borderWidth: 2, borderColor: '#8d1d68ff' },
  favIcon: { position: 'absolute', top: 6, right: 10, fontSize: 18, color: '#9ca3af' },
  favIconActive: { color: '#8d1d68ff' },
  thumb: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#e5e7eb' },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  price: { marginTop: 2, fontWeight: '600', color: '#374151' },
  empty: { marginTop: 24, color: '#6b7280' },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  modalCard: { width: '100%', maxWidth: 520, backgroundColor: 'white', borderRadius: 16, padding: 16 },
  bigImage: { width: '100%', height: 260, borderRadius: 12, backgroundColor: '#e5e7eb' },
  modalTitle: { marginTop: 4, fontSize: 18, fontWeight: '800', color: '#111827' },
  modalDesc: { marginTop: 6, fontSize: 14, color: '#374151' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#e5e7eb',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginTop: 8,
  },
  btn: {
    backgroundColor: '#8d1d68ff',
    paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10,
  },
  btnText: { color: 'white', fontWeight: '700' },
});
