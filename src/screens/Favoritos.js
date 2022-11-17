import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
});
