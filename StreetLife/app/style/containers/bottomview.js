import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 70
  },
  centerview: {
    borderBottomWidth: 3,
    borderColor: "yellow",
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 3
  },
  image: {
    flex: 9,
    borderRadius: 3
  },
  text: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#000",
    fontWeight: "bold",
    width: 100,
    height: 30
  },
  photoimage: {
    paddingVertical: 0,
    width: 100,
    height: 70,
    borderRadius: 3
  },
  textinput: {
    height: 33,
    color: "#fff",
    fontSize: 10,
    width: 100,
    borderColor: "#fff",
    borderWidth: 1
  }
});
