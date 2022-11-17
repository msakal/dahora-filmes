import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import fotoAlternativa from "../../assets/images/foto-alternativa.jpg";
import { formataData } from "../utils/funcoes";

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
          source={
            filme.backdrop_path
              ? {
                  uri: `https://image.tmdb.org/t/p/original/${filme.backdrop_path}`,
                }
              : fotoAlternativa
          }
        >
          <Text style={estilos.titulo}> {filme.title} </Text>
        </ImageBackground>

        <View style={estilos.conteudo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={estilos.avaliacao}>
              Avaliação: {filme.vote_average} | Lançamento:{" "}
              {formataData(filme.release_date)}
            </Text>
            <Text style={estilos.descricao}>
              {filme.overview || "Sem descrição"}
            </Text>
          </ScrollView>
        </View>
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
    /* padding: 8, -> sem o padding, a imgem usa toda área. */
  },

  imagem: {
    height: 200,
    justifyContent: "center",
  },

  avaliacao: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#5451a6",
  },

  titulo: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    textAlign: "center",
    padding: 16,
    fontWeight: "bold",
    fontSize: 16,
  },

  conteudo: {
    flex: 1 /* Necessário para o scrollview funcionar */,
    padding: 16,
  },

  descricao: {
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 8,
  },

  semImagem: {
    width: 128,
    height: 128,
  },
});
