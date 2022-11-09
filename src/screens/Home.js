import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import logo from "../../assets/images/logo.png";

const corPrimaria = "#5451a6";

const Home = ({ navigation }) => {
  const [fonteCarregada] = useFonts({
    monoton: require("../../assets/fonts/Monoton-Regular.ttf"),
  });
  if (!fonteCarregada) return <Text>Carregando...</Text>;

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.viewLogo}>
        <Image style={estilos.logo} source={logo} />
        <Text style={estilos.tituloApp}>Dá Hora Filmes</Text>
      </View>

      <View style={estilos.viewBotoes}>
        <Pressable
          style={estilos.botaoInicial}
          onPress={() => {
            navigation.navigate("FormBusca");
          }}
        >
          <Text style={estilos.textoBotao}>
            <Ionicons name="search" size={16} color="white" /> Buscar Filmes
          </Text>
        </Pressable>

        <Pressable
          style={estilos.botaoInicial}
          onPress={() => {
            navigation.navigate("Favoritos");
          }}
        >
          <Text style={estilos.textoBotao}>
            <Ionicons name="star" size={16} color="gold" /> Favoritos
          </Text>
        </Pressable>
      </View>

      <View style={estilos.viewRodape}>
        <Pressable
          style={estilos.botaoRodape}
          onPress={() => {
            navigation.navigate("Privacidade");
          }}
        >
          <Text style={estilos.textoBotao}>
            <Ionicons name="lock-closed" size={16} color="white" /> Privacidade
          </Text>
        </Pressable>

        <Pressable
          style={estilos.botaoRodape}
          onPress={() => {
            navigation.navigate("Sobre");
          }}
        >
          <Text style={estilos.textoBotao}>
            <Ionicons name="information-circle" size={16} color="white" /> Sobre
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const estilos = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 128,
    height: 128,
  },

  botaoInicial: {
    borderStyle: "solid",
    borderWidth: 2,
    padding: 16,
    backgroundColor: corPrimaria,
  },

  textoBotao: {
    color: "white",
  },

  viewLogo: {
    flex: 3,
    width: "80%",
    textAlign: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  tituloApp: {
    fontSize: 28,
    fontFamily: "monoton",
    color: corPrimaria,
  },

  viewBotoes: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "80%",
  },

  viewRodape: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: corPrimaria,
  },

  botaoRodape: {
    padding: 16,
  },
});
