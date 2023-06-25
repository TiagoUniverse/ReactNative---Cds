import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { StyleSheet } from 'react-native';


export default function Home({ navigation }) {
    return (
        <View>
            <View style={styles.container}>
                <Image
                style={{
                    width: '100%',
                    height: '50%',
                    alignItems: 'center',
                }}
                source={require('../../../assets/logo.png')}
                />
                <Text style={styles.menu}> Menu </Text>
                <View style={styles.buttonOutside}>
                    <Button 
                     title="Criar"
                     onPress={() => navigation.navigate('Criar')}
                    />
                </View>
            
                <View style={styles.buttonOutside}>
                    <Button
                     title="Consultar"
                     onPress={() => navigation.navigate('Consultar')}
                    />
                </View>

                <View style={styles.buttonOutside}>
                    <Button
                     title="Alterar"
                     onPress={() => navigation.navigate('Alterar')}
                    />
                </View>

                <View style={styles.buttonOutside}>
                    <Button
                     title="Deletar"
                     onPress={() => navigation.navigate('Deletar')}
                     />
                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      marginLeft: 50,
      marginRight: 50,
      borderWidth: 1, 
      borderColor: '#d5d5d5', 
      borderRadius: 4, 
      marginBottom: 10, 
      marginHorizontal: 20, 
      padding: 10,
      backgroundColor: '#fafafa'
    },
    buttonOutside:{
        marginBottom: 12,
        
    },
    menu:{ 
        fontSize: 22, 
        marginBottom: 20, 
        textAlign: 'center',
    },
    button:{
        fontSize: 22,
        borderRadius: 10
    }
        })

