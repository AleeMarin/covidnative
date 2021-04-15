import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>HEADER</Text>
      <Text>BUSCADOR</Text>
      <Text>Mensaje de sin conexion</Text>
      <Text>Nombre pais elegido - Fav</Text>
      <Text>Nuevos casos diarios</Text>
      <Text>10.000</Text>
      <Text>Confirmados</Text>
      <Text>120</Text>
      <Text>Muertos</Text>
      <Text>Total de casos</Text>
      <Text>100.000</Text>
      <Text>Activos</Text>
      <Text>2.100.000</Text>
      <Text>Confirmados</Text>
      <Text>52.000</Text>
      <Text>Muertos</Text>
      <Text>Ultima actualización el 01/04/2021 16:30 horas</Text>
      <Text>Compartir</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});