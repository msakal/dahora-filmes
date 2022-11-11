import { StyleSheet, Text, View } from "react-native";

const ItemSeparador = () => {
  return (
    <View style={estilos.viewSeparador}>
      <View style={estilos.linha}></View>
    </View>
  );
};

export default ItemSeparador;

const estilos = StyleSheet.create({
  viewSeparador: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },

  linha: {
    backgroundColor: "red",
    height: 2,
    width: "80%",
  },
});
