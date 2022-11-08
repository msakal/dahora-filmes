import { StyleSheet, StatusBar } from "react-native";
import Favoritos from "./src/screens/Favoritos";
import FormBusca from "./src/screens/FormBusca";
import Home from "./src/screens/Home";
import Sobre from "./src/screens/Sobre";
import Privacidade from "./src/screens/Privacidade";

const App = () => {
  return (
    <>
      {/* opções para o barStyle: dark-content, light-content ou default */}
      <StatusBar barStyle="default" />
      <Home />
      {/* <FormBusca />
      <Favoritos />
      <Sobre />
      <Privacidade /> */}
    </>
  );
};

export default App;

const estilos = StyleSheet.create({});
