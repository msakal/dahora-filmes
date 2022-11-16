import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

/* Prop de route para acesso aos dados trafegados entre a navegação entre as tabelas/rotas */
const Detalhes = ({ route }) => {
  /* console.log(route); */
  const { filme } = route.params;
  console.log(filme);

  return (
    <SafeAreaView style={estilos.safeContainer}>
      <View style={estilos.container}>
        <ImageBackground
          style={estilos.imagem}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${filme.backdrop_path}`,
          }}
        >
          <Text> {filme.title} </Text>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Detalhes;

const estilos = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },

  /* Aplicando (padding) aqui, pois no IOS não funciona direto na <SafeAreaView> */
  container: {
    flex: 1,
  },

  imagem: {
    height: 200,
  },

  title: {},
});
