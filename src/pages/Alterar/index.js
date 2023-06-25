import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TextInput } from 'react-native';


export default function Alterar() {
  const [rioEscolhido, setRioEscolhido] = useState(null);
  const [nomeRio, setNomeRio] = useState(null)
  const [endereco, setEndereco] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [potencialhidrogenico, setPotencialHidrogenico] = useState(null)
  const [oxigeniodissolvido, setOxigenioDissolvido] = useState(null)
  const [temperatura, setTemperatura] = useState(null)
  const [condutividade, setCondutividade] = useState(null)
  const [salinidade, setSalinidade] = useState(null)
  const [turbidez, setTurbidez] = useState(null)


  const atualizarRio = () => {
    const endpoint = `https://aquavitta1.pythonanywhere.com/nalinha/update/${nomeRio}/${endereco}/${latitude}/${longitude}/${potencialhidrogenico}/${oxigeniodissolvido}/${temperatura}/${condutividade}/${salinidade}/${turbidez}`;
    console.log(endpoint)
    console.log(nomeRio)
    fetch(endpoint)
      .then(resposta => resposta.json())
        .catch(() => {
          Alert.alert('Alteração', 'Ponto de rio alterado com sucesso!');
        });
  }


  const getRio = ( nomeRio) => {
    const endpoint = `https://aquavitta1.pythonanywhere.com/leitura/${ nomeRio}`;
    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        const rio = {
          nomeRio: json.rio,
          endereco: json.endereco,
          condutividade: json.condutividade,
          latitude: json.latitude,
          longitude: json.longitude,
          oxigeniodissolvido: json.oxigeniodissolvido,
          potencialhidrogenico: json.potencialhidrogenico,
          salinidade: json.salinidade,
          temperatura: json.temperatura,
          turbidez: json.turbidez
        };
        setRioEscolhido(rio);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível alterar este rio');
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>AquaVitta</Text>
        </View>
        {rioEscolhido != null && (
          <View style={styles.Box}>
            <Text style={styles.linha}>Nome do rio: {rioEscolhido.nomeRio} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setNomeRio}
                    value={ nomeRio}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>Endereço: {rioEscolhido.endereco} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setEndereco}
                    value={ endereco}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>condutividade: {rioEscolhido.condutividade} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setCondutividade}
                    value={ condutividade}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>Latitude: {rioEscolhido.latitude} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setLatitude}
                    value={ latitude}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>Longitude: {rioEscolhido.longitude} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setLongitude}
                    value={ longitude}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>Oxigênio dissolvido: {rioEscolhido.oxigeniodissolvido} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setOxigenioDissolvido}
                    value={ oxigeniodissolvido}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>Potencial hidrogênico: {rioEscolhido.potencialhidrogenico} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setPotencialHidrogenico}
                    value={ potencialhidrogenico}
                    KeyboardType="text"
                />
                
            <Text style={styles.linha}>Salinidade: {rioEscolhido.salinidade} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setSalinidade}
                    value={ salinidade}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>temperatura: {rioEscolhido.temperatura} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setTemperatura}
                    value={ temperatura}
                    KeyboardType="text"
                />

            <Text style={styles.linha}>turbidez: {rioEscolhido.turbidez} </Text>
            <TextInput style={styles.TextInputtt}
                    onChangeText={setTurbidez}
                    value={ turbidez}
                    KeyboardType="text"
                />

          </View>
        )}


        <View style={styles.cardContainer}>
          {rioEscolhido == null && (
            <><><Text>Digite o nome do rio no campo abaixo:</Text></><TextInput style={styles.TextInputt}
              onChangeText={setNomeRio}
              value={nomeRio}
              KeyboardType="text" /><Button title="Puxar o rio" onPress={() => getRio(nomeRio)} /></>
          )}

          {rioEscolhido != null && (
            <><><Text>Digite novamente todos para fazer a alteração e evitar que um campo fique nulo</Text></>
            <Button  title="Atualizar registro" onPress={() => atualizarRio()}></Button></>
          )}

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
  cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },

  Box: { alignItems: 'center' },
  linha: { fontSize: 18, fontStyle: 'italic' },
  
  TextInputt:{
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    color: '#4F4F4F',
    paddingLeft: 10
},
TextInputtt:{
  marginTop: 5,
  backgroundColor: '#DCDCDC',
  borderRadius: 4,
  marginBottom: 15,
  marginTop: 5,
  paddingLeft: 100,
  paddingRight: 100,
  color: '#4F4F4F'
},
});

