import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  calout: {
    width: 120,
    height: 120,
    top: 30,
    opacity: 0.7,
    left: "60%",
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 3
  },
  image: {
    flex: 9
  },
  text: {
    textAlign: "center",
    padding: 3,
    fontWeight: "bold"
  },
  close: {
    color: "#fff",
    padding: 3,
    textAlign: "center",
    backgroundColor: "red"
  },
  photoimage: {
    width: 20,
    height: 20,
    margin: 6,
    padding: 6
  },
  mode: {
    top: 10,
    left: 20,
    backgroundColor: "#fff",
    position: "absolute",
    flexDirection: "row"
  }
});
