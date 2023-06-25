import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import Criar from './src/pages/Criar';
import Consultar from './src/pages/Consultar';
import Alterar from './src/pages/Alterar';
import Deletar from './src/pages/Deletar';

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='AquaVitta' screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#0000CD' },
      }} >
        <Stack.Screen name="AquaVitta" component={Home} />
        <Stack.Screen name="Criar" component={Criar}  />
        <Stack.Screen name="Consultar" component={Consultar} />
        <Stack.Screen name="Alterar" component={Alterar} />
        <Stack.Screen name="Deletar" component={Deletar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


