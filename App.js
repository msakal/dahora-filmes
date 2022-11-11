import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Favoritos from "./src/screens/Favoritos";
import FormBusca from "./src/screens/FormBusca";
import Sobre from "./src/screens/Sobre";
import Privacidade from "./src/screens/Privacidade";
import Resultados from "./src/screens/Resultados";

const App = () => {
  /* Inicializando através de uma constante o gerenciados de navegação Stack (pilha de telas) */
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar />

      {/* O navivagtionContainer deve envolver todas as telas navegáveis do nosso App */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#5451a6",
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={FormBusca}
            name="FormBusca"
            options={{ title: "Buscar Filmes" }}
          />
          <Stack.Screen component={Favoritos} name="Favoritos" />
          <Stack.Screen component={Privacidade} name="Privacidade" />
          <Stack.Screen component={Sobre} name="Sobre" />

          <Stack.Screen component={Resultados} name="Resultados" />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const estilos = StyleSheet.create({});
