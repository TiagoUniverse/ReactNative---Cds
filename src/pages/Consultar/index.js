import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TextInput } from 'react-native';



export default function Consultar(){
    const [ rioEscolhido, setRioEscolhido ] = useState(null);
    const [ nomeRio, setNomeRio] = useState(null)
  
    const getRio = ( nomeRio) => {
      const endpoint = `https://aquavitta1.pythonanywhere.com/leitura/${ nomeRio}`;
      // console.log(JSON.stringify(endpoint))
      fetch(endpoint)
        .then(resposta => resposta.json())
          .then( json => {
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
            Alert.alert('Falha na busca', 'Não encontrei nenhum rio com este nome!');
          });
    }
  
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topo}>
            <Text style={styles.topoTitulo}>AquaVitta</Text>
            </View>
            {rioEscolhido != null && (
            <View style={styles.cardContainer}>
              <Text style={styles.linha}>Nome do rio: {rioEscolhido.nomeRio}</Text>
              <Text style={styles.linha}>Endereço: {rioEscolhido.endereco}</Text>
              <Text style={styles.linha}>condutividade: {rioEscolhido.condutividade} S/m</Text>
              <Text style={styles.linha}>Latitude: {rioEscolhido.latitude}</Text>
              <Text style={styles.linha}>Longitude: {rioEscolhido.longitude}</Text>
              <Text style={styles.linha}>Oxigênio dissolvido: {rioEscolhido.oxigeniodissolvido} mg/L</Text>
              <Text style={styles.linha}>Potencial hidrogênico: {rioEscolhido.potencialhidrogenico} pH</Text>
              <Text style={styles.linha}>Salinidade: {rioEscolhido.salinidade} ppm</Text>
              <Text style={styles.linha}>temperatura: {rioEscolhido.temperatura} °C</Text>
              <Text style={styles.linha}>turbidez: {rioEscolhido.turbidez} NTU</Text>
            </View>
          )}
  
  

            
            <View style={styles.cardContainer}>
              
              {rioEscolhido == null &&(
                <><Text>Digite o nome do rio no campo abaixo:</Text><TextInput style={styles.TextInputt}
                onChangeText={setNomeRio}
                value={ nomeRio}
                KeyboardType="text" /></>
              )}


              <Button title="Consultar" onPress={()=>getRio( nomeRio)}/>
            </View>
            
  
          
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fafafa' },
  
    topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#00008B' },
    topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center'},
  
    cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10, },
    cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },
  
    Box: { alignItems: 'center' },
     
    linha: { fontSize: 18, marginBottom: 10, borderRadius: 4, paddingLeft: 10, paddingBottom: 2, paddingTop: 2 },
    
    TextInputt:{
      backgroundColor: '#DCDCDC',
      borderRadius: 4,
      marginBottom: 15,
      marginTop: 5,
      color: '#4F4F4F',
      paddingLeft: 10,
  },  
  });

