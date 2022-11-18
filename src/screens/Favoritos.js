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
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import fotoAlternativa from "../../assets/images/foto-alternativa.jpg";

const Favoritos = () => {
  const [listaFavoritos, setListaDeFavoritos] = useState([]);

  const navigation = useNavigation();

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

  const verDetalhes = (filmeSelecionado) => {
    navigation.navigate("Detalhes", { filme: filmeSelecionado });
  };

  const excluirFavoritos = async () => {
    Alert.alert(
      "Excluir TODOS",
      "Tem certeza que deseja excluir TODOS os Favoritos?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return false;
          },
          style: "cancel" /* Somente no IOS */,
        },
        {
          text: "Sim, to nem ai",
          onPress: async () => {
            /* Usamos o removeItem para apagar os dados dos @favoritos do nosso app */
            await AsyncStorage.removeItem("@favoritos");

            /* Atualizar o render do componente (removendo da tela os favoritos) */
            setListaDeFavoritos([]);
          },
          style: "destructive",
        },
      ]
    );
  };

  const excluirUmFavorito = async (indice) => {
    /* Alert.alert(`exluindo um favorito .. ${indice}`); */
    /* Etapas para excluir: */

    /* 1. Conhecendo o índice, remover o elemento (filme do array listaFavoritos)
    splice.: indicamos o indice de referência (na prática, o indice do filme que queremos remover e, 
    a partir deste indice, a quantidade de elementos que queremos remover. Como aqui queremos apagar
    o próprio filme escolhido, passamos 1).*/
    listaFavoritos.splice(indice, 1);

    /* 2. Atualizar p storage com a lista atualizada (ou seja, sem o filme) 
    Obs: é necessário transformar em string antes de gravar no Storage. */
    await AsyncStorage.setItem("@favoritos", JSON.stringify(listaFavoritos));

    /* 3. Recarregar do storage a nova lista de favoritos
    Obs: é necessário transformar em array/objeto antes de manipular na aplicação*/
    const listaDeFilmes = JSON.parse(await AsyncStorage.getItem("@favoritos"));

    /* 4. Atualizar o state para um novo render na tela com a lista de favoritos */
    setListaDeFavoritos(listaDeFilmes);
  };

  return (
    <SafeAreaView style={estilos.safeContainer}>
      <View style={estilos.container}>
        <View style={estilos.cabecalho}>
          <Text style={estilos.prtQtde}>
            Quantidade: {listaFavoritos.length}{" "}
          </Text>
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
          {listaFavoritos.map((filmeFavorito, indice) => {
            return (
              <Pressable
                /* Dando ação a lista para consulta detalhada do filme */
                onPress={verDetalhes.bind(this, filmeFavorito)}
                key={filmeFavorito.id}
                style={estilos.itemFilme}
              >
                <Image
                  style={estilos.imagem}
                  resizeMode="cover"
                  source={
                    filmeFavorito.poster_path
                      ? {
                          uri: `https://image.tmdb.org/t/p/original/${filmeFavorito.poster_path}`,
                        }
                      : fotoAlternativa
                  }
                />

                <Text style={estilos.titulo}> {filmeFavorito.title}</Text>
                <Pressable
                  style={estilos.botaoExcluir}
                  /* onPress={excluirUmFavorito} */
                  /* onPress={() => excluirUmFavorito(indice)} */
                  onPress={excluirUmFavorito.bind(this, indice)}
                >
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
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#5451a6",
  },

  itemFilme: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eee8fc",
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

  imagem: {
    height: 40,
    width: 40,
  },
});
