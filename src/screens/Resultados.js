import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";

import api from "../services/api";
import apiKey from "../../apiKey";
import Loading from "../components/Loading";
import CardFilme from "../components/CardFilme";
import ItemSeparador from "../components/ItemSeparador";
import ItemVazio from "../components/ItemVazio";

const Resultados = ({ route }) => {
  const { filme } = route.params;

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  /* useEffect: hook do React que executa operações no momento em que o componente (neste caso, Resultado) é renderizado. */
  useEffect(() => {
    /* Assim que entramos em Resultado, é executado a função async buscarFilmes que por sua vez através do axios executa
    a consulta à API baseada no filme que foi digitado. */
    async function buscarFilmes() {
      try {
        /* Aguardamos a resposta da consulta get ao endpoint "/serach/movie" da api, Observe que este endpoint precisa de parâmetros 
        para a execução correta da consulta. Estes parâmetros DEVEM ter mesmo nome indicado na documentação do endpint/API. */
        const resposta = await api.get("/search/movie", {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            query: filme,
            include_adult: false,
          },
        });
        setResultados(resposta.data.results);

        /* Simulando um tempo de carregamento lento usando temporizador setInterval */
        /*  setInterval(() => {
          setLoading(false);
        }, 3000); */
        setLoading(false);

        /* setLoading(false); */
      } catch (error) {
        console.log("Deu ruim na busca da API: " + error.message);
      }
    }
    buscarFilmes();
  }, []);

  /* if (loading) return <Loading />; */

  return (
    <SafeAreaView style={estilos.container}>
      <Text>Você buscou por: {filme}</Text>

      {/* sintaxe de if ecaluate usando &&
      Se loading for TRUE, renderize <Loading/> */}
      {loading && <Loading />}

      {/* Se loading for false, renderize o resultado map */}
      <View style={estilos.viewFilmes}>
        {!loading && (
          <FlatList
            /* Visualização de forma Horizontal */
            /* horizontal={true} */
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparador}
            ListEmptyComponent={
              <View>
                <Text style={estilos.semFilme}>Não há filmes</Text>
              </View>
            }
            data={resultados}
            renderItem={({ item }) => {
              return <CardFilme filme={item} />;
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Resultados;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  viewFilmes: {
    marginVertical: 8,
    /* alignItems: "center", */
  },

  semFilme: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 60,
  },
});
