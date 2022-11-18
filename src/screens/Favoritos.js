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
        /* Acessar o storage @favoritos e tentar carregar os dados existentes */
        const dados = await AsyncStorage.getItem("@favoritos");

        /* Havendo dados, transformamos eles em array de objetos */
        const filmes = JSON.parse(dados);

        /* Se realmente tem dados (ou seja, não é null), atualizamos o componente */
        if (dados != null) {
          setListaDeFavoritos(filmes); /* state de dadps do componente */
        }
      } catch (error) {
        console.log("Deu ruim no carregamento" + error.message);
      }
    }

    carregarFavoritos();
  }, []);

  const excluirFavoritos = async () => {
    /* Usamos o removeItem para apagar os dados dos @favoritos do nosso app */
    await AsyncStorage.removeItem("@favoritos");

    /* Atualizar o render do componente (removendo da tela os favoritos) */
    setListaDeFavoritos([]);
    Alert.alert("Favoritos", "Favoritos excluidos!");
  };

  return (
    <SafeAreaView style={estilos.safeContainer}>
      <View style={estilos.container}>
        <View style={estilos.cabecalho}>
          <Text>Quantidade: {listaFavoritos.length} </Text>
          <Pressable
            style={estilos.botaoExcluirTudo}
            onPress={excluirFavoritos}
          >
            <Text style={estilos.textoExcluirTudo}>
              <Ionicons name="trash-outline" size={16} />
              Excluir Favoritos
            </Text>
          </Pressable>
        </View>

        {/* Programação necessária para acessar a lista de favoritos e exibir o título de cada filme */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {listaFavoritos.map((filmeFavorito) => {
            return (
              <Pressable key={filmeFavorito.id} style={estilos.itemFilme}>
                <Text style={estilos.titulo}> {filmeFavorito.title} </Text>
                <Pressable style={estilos.botaoExcluir}>
                  <Ionicons name="trash" size={18} color="white" />
                </Pressable>
              </Pressable>
            );
          })}
        </ScrollView>
        {/* <Button title="Excluir favoritos" onPress={excluirFavoritos} /> */}
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
    borderStartColor: "white",
  },

  prtQtde: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#5451a6",
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
    padding: 8,
    borderRadius: 4,
  },

  cabecalho: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  botaoExcluirTudo: {
    borderWidth: 1,
    borderColor: "red",
    padding: 8,
    borderRadius: 4,
  },

  textoExcluirTudo: {
    color: "red",
  },

  titulo: {
    flex: 1,
    fontSize: 14,
  },
});
