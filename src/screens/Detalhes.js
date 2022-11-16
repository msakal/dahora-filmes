import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

/* Prop de route para acesso aos dados trafegados entre a navegação entre as tabelas/rotas */
const Detalhes = ({ route }) => {
  /* console.log(route); */
  const { filme } = route.params;
  console.log(filme);

  return (
    <SafeAreaView>
      <Text>Detalhes</Text>
    </SafeAreaView>
  );
};

export default Detalhes;

const estilos = StyleSheet.create({});
