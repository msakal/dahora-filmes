import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
/* Site de busca dos icones: 'icons.expo.fyi' -->  filtrar por Ionicons*/

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import fotoAlternativa from "../../assets/images/foto-alternativa.jpg";

const CardFilme = ({ filme }) => {
  const { title, poster_path } = filme;

  const navigation = useNavigation();

  /* função leia mais */
  const leiaMais = () => {
    /* Alert.alert("Vai!", "Detalhes do filme..."); */
    navigation.navigate("Detalhes", { filme });
  };

  /* função salvar */
  const salvar = async () => {
    /* return Alert.alert("Favoritos", "Salvando.."); */
    /* ETAPAS para uso do asyncStorage:
      1. Carregamento do storage do aparelho (se houver, caso contrario retorna null).
      2. Havendo storage prévio, tranformar os dados do filme um objetos e os guardamos numa lista (array).
      3. Se a lista não for indefinida, vamos iniciá-la vazia.
      4. Adicionamos os dados do filme na lista (array).
      5. Finalmente, salvamos no storage do dispositivo.
     */
    /* 1. */
    const filmesFavoritos = await AsyncStorage.getItem("@favoritos");
  };

  return (
    <View style={estilos.card}>
      <Image
        style={estilos.imagem}
        resizeMode="cover"
        source={
          poster_path
            ? { uri: `https://image.tmdb.org/t/p/original/${poster_path}` }
            : fotoAlternativa
        }
      />
      <View style={estilos.corpo}>
        <Text style={estilos.titulo}> {title} </Text>

        <View style={estilos.botoes}>
          <Pressable style={estilos.botao} onPress={leiaMais}>
            <Text style={estilos.textoBotao}>
              <Ionicons name="book" size={12} /> Leia mais
            </Text>
          </Pressable>

          <Pressable style={estilos.botao} onPress={salvar}>
            <Text style={estilos.textoBotao}>
              <Ionicons name="add-circle" size={12} /> Salvar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardFilme;

const estilos = StyleSheet.create({
  card: {
    marginVertical: 4,
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imagem: {
    flex: 1,
    height: 150,
    width: 100,
  },

  corpo: {
    flex: 2,
  },

  titulo: {
    backgroundColor: "#5451a6",
    color: "white",
    fontSize: 16,
    paddingVertical: 8,
    textAlign: "center",
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  botao: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#5451a6",
  },

  textoBotao: {
    color: "#5451a6",
    fontSize: 12,
    textTransform: "uppercase",
  },
});
