import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const Favoritos = () => {
  const [listaFavoritos, setListaDeFavoritos] = useState([]);

  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const dados = await AsyncStorage.getItem("@favoritos");
        const filmes = JSON.parse(dados);

        if (dados != null) {
          setListaDeFavoritos(filmes);
        }
      } catch (error) {
        console.log("Deu ruim no carregamento" + error.message);
      }
    }

    carregarFavoritos();
  }, []);

  const excluirFavoritos = async () => {
    await AsyncStorage.removeItem("@favoritos");
    setListaDeFavoritos([]);
    Alert.alert("Favoritos", "Favoritos excluidos!");
  };

  return (
    <SafeAreaView style={estilos.safeContainer}>
      <View style={estilos.container}>
        <Text>Quantidade: {listaFavoritos.length} </Text>
        <Button title="Excluir favoritos" onPress={excluirFavoritos} />

        {/* Programação necessária para acessar a lista de favoritos e exibir o título de cada filme */}
        {listaFavoritos.map((filmeFavorito) => {
          return (
            <Pressable key={filmeFavorito.id} style={estilos.itemFilme}>
              <Text> {filmeFavorito.title} </Text>
              <Pressable style={estilos.botaoExcluir}>
                <Ionicons name="trash" size={24} color="white" />
              </Pressable>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Favoritos;

const estilos = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 8,
  },

  itemFilme: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    marginVertical: 8,
    borderRadius: 4,
  },

  botaoExcluir: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 4,
  },
});
