import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { getDatabase, ref, update, onValue } from 'firebase/database';
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

export default function Alterar() {
  const [cdEscolhido, setCdEscolhido] = useState(null);
  const [nome, setNome] = useState(null);
  const [compositor, setCompositor] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  const atualizarCd = () => {
    if (!cdEscolhido) {
      setMensagem('Não há CD selecionado para atualizar.');
      return;
    }

    if (!nome || !compositor) {
      setMensagem('Por favor, preencha todos os campos para atualizar o CD.');
      return;
    }

    const cdsRef = ref(db, `cds/${cdEscolhido.id}`);

    update(cdsRef, {
      nome: nome,
      compositor: compositor,
    })
      .then(() => {
        setMensagem('CD alterado com sucesso!');
        setCdEscolhido(null);
        setNome(null);
        setCompositor(null);
      })
      .catch(() => {
        setMensagem('Não foi possível alterar o CD.');
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
            <TextInput
              style={styles.TextInputtt}
              onChangeText={setNome}
              value={nome}
              keyboardType="text"
              placeholder="Digite o novo nome do CD"
            />

            <Text style={styles.linha}>Compositor: {cdEscolhido.compositor}</Text>
            <TextInput
              style={styles.TextInputtt}
              onChangeText={setCompositor}
              value={compositor}
              keyboardType="text"
              placeholder="Digite o novo compositor do CD"
            />
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
              <Button title="Buscar por um CD" onPress={() => buscarCd(nome)} />
            </>
          )}

          {cdEscolhido != null && (
            <>
              <Text>Digite novamente todos para fazer a alteração e evitar que um campo fique nulo:</Text>
              <Button title="Atualizar registro" onPress={() => atualizarCd()} />
            </>
          )}
        </View>

        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
            {/* ... */}
          </View>
        </View>
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
  linha: { fontSize: 18, fontStyle: 'italic' },
  mensagem: { fontSize: 16, color: 'red', marginBottom: 10, textAlign: 'center' },
  TextInputt: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    color: '#4F4F4F',
    paddingLeft: 10,
  },
  TextInputtt: {
    marginTop: 5,
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    paddingLeft: 100,
    paddingRight: 100,
    color: '#4F4F4F',
  },
});
