import { StyleSheet, StatusBar } from "react-native";
import Favoritos from "./src/screens/Favoritos";
import FormBusca from "./src/screens/FormBusca";
import Home from "./src/screens/Home";

const App = () => {
  return (
    <>
      {/* opções para o barStyle: dark-content, light-content ou default */}
      <StatusBar barStyle="default" />
      <FormBusca />
      <Favoritos />
    </>
  );
};

export default App;

const estilos = StyleSheet.create({});
