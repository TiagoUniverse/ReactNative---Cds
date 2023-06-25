import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { getDatabase, ref, remove } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { get, orderByChild, equalTo } from 'firebase/database';
import { onValue } from 'firebase/database';

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

export default function Alterar() {
  const [cdEscolhido, setCdEscolhido] = useState(null);
  const [nome, setNome] = useState(null);
  const [compositor, setCompositor] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  const deletarCd = () => {
    if (!cdEscolhido) {
      Alert.alert('Exclusão', 'Nenhum CD selecionado para exclusão.');
      return;
    }

    const cdsRef = ref(db, `cds/${cdEscolhido.id}`);

    remove(cdsRef)
      .then(() => {
        Alert.alert('Exclusão', 'CD excluído com sucesso!');
        setCdEscolhido(null);
        setCompositor(null);
        setMensagem(null);
      })
      .catch(() => {
        Alert.alert('Exclusão', 'Não foi possível excluir o CD.');
      });
  };

  const buscarCd = (nome) => {
    const cdsRef = ref(db, 'cds');

    onValue(cdsRef, (snapshot) => {
      const cds = snapshot.val();

      if (cds) {
        const cdEncontrado = Object.entries(cds).find(([id, cd]) => cd.nome === nome);

        if (cdEncontrado) {
          const [id, cd] = cdEncontrado;
          setCdEscolhido({ id, ...cd });
        } else {
          setMensagem('Não foi encontrado nenhum CD com este nome.');
          setCdEscolhido(null);
        }
      } else {
        setMensagem('Não há CDs cadastrados.');
        setCdEscolhido(null);
      }
    });
  };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>AquaVitta</Text>
        </View>

        {cdEscolhido != null && (
          <View style={styles.Box}>
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
                onChangeText={setNome}
                value={nome}
                keyboardType="text"
                placeholder="Digite o nome do CD"
              />
              <Button title="Selecionar um CD para exclusão" onPress={() => buscarCd(nome)} />
            </>
          )}

          {cdEscolhido != null && (
            <>
              <Text>Confira o CD que deseja excluir e confirme no botão abaixo:</Text>
              <Button title="Excluir" onPress={() => deletarCd()} />
            </>
          )}
        </View>
        {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#00008B' },
  topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center' },
  cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  Box: { alignItems: 'center' },
  linha: { fontSize: 18 },
  mensagem: { fontSize: 16, color: 'red', marginBottom: 10, textAlign: 'center' },
  TextInputt: {
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    paddingLeft: 10,
    color: '#4F4F4F'
  },
  mensagem: { color: 'red', textAlign: 'center', marginTop: 10 }
});
