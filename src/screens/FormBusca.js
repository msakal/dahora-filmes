import {
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  Button,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const corPrimaria = "#5451a6";

const FormBusca = ({ navigation }) => {
  /* state para o filme que será buscado */
  const [filme, setFilme] = useState("");

  /* evento de captura do texinput a partir do onchangetext (em tempo real). */
  const capturaDigitacao = (valorDigitado) => {
    setFilme(valorDigitado);
  };

  /* Função chamada toda vez que o botão for pressionado (usando a prop onPress do Button) */
  const inputTexto = () => {
    if (!filme) {
      Alert.alert("Ops!", "Você deve digitar o nome de um filme"),
        [{ filme: "OK" }];
      return;
    }
    /* Alert.alert("Você procurou por:", filme), [{ filme: "OK" }]; */

    /* Usamos a prop navigation (que vem no React Navigation programando no App) para acessar esta tela, 
    passamos como objeto os dados digitados no formulário (neste caso, filme). */
    navigation.navigate("Resultados", { filme });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>
        Star Trek? O Poderoso Chefão? A trilogia Senhor dos Anéis?
      </Text>

      <Text style={estilos.titulo}>
        Localize um filme que você viu ou gostaria de ver!
      </Text>

      <View style={estilos.caixaInput}>
        <Ionicons name="film" size={44} color="black" />
        <TextInput
          style={estilos.inPut}
          onChangeText={capturaDigitacao}
          placeholder="Filme..."
        />
      </View>

      <Button title="Buscar" color={corPrimaria} onPress={inputTexto} />
    </SafeAreaView>
  );
};

export default FormBusca;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    /*  marginHorizontal: 16,
    justifyContent: "center", */
  },
  titulo: {
    textAlign: "left",
    marginVertical: 8,
  },
  inPut: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  caixaInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  botao: {
    backgroundColor: corPrimaria,
  },
});
