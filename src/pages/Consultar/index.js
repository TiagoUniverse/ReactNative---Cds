import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TextInput } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCTXwvVKN7uUQZgfc9wWBRY1ZurfWzsEL4",
  authDomain: "crud-vinil.firebaseapp.com",
  projectId: "crud-vinil",
  storageBucket: "crud-vinil.appspot.com",
  messagingSenderId: "140079233359",
  appId: "1:140079233359:web:ddc4d2eb07ac60b63bad3a"
};

// Inicialize o app Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export default function Consultar() {
  const [cdEscolhido, setcdEscolhido] = useState(null);
  const [nomeCd, setNomeCd] = useState(null);

  const getCd = (nomeCd) => {
    const cdsRef = ref(db, 'cds');

    onValue(cdsRef, (snapshot) => {
      const cds = snapshot.val();

      if (cds) {
        const cdEncontrado = Object.values(cds).find((cd) => cd.nome === nomeCd);

        if (cdEncontrado) {
          setcdEscolhido(cdEncontrado);
        } else {
          Alert.alert('Falha na busca', 'Não encontrei nenhum CD com este nome!');
          setcdEscolhido(null);
        }
      } else {
        Alert.alert('Falha na busca', 'Não encontrei nenhum CD cadastrado!');
        setcdEscolhido(null);
      }
    }, (error) => {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os CDs.');
      setcdEscolhido(null);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>AquaVitta</Text>
        </View>

        {cdEscolhido != null && (
          <View style={styles.cardContainer}>
            <Text style={styles.linha}>Nome do CD: {cdEscolhido.nome}</Text>
            <Text style={styles.linha}>Compositor: {cdEscolhido.compositor}</Text>
          </View>
        )}

        <View style={styles.cardContainer}>
          {cdEscolhido == null && (
            <>
              <Text>Digite o nome do CD no campo abaixo:</Text>
              <TextInput
                style={styles.TextInputt}
                onChangeText={setNomeCd}
                value={nomeCd}
                keyboardType="text"
              />
            </>
          )}

          <Button title="Consultar" onPress={() => getCd(nomeCd)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },

  topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#00008B' },
  topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center' },

  cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },

  Box: { alignItems: 'center' },

  linha: { fontSize: 18, marginBottom: 10, borderRadius: 4, paddingLeft: 10, paddingBottom: 2, paddingTop: 2 },

  TextInputt: {
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    color: '#4F4F4F',
    paddingLeft: 10,
  },
});
