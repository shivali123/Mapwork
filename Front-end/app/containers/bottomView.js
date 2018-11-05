import React, { Component } from "react";
import { View, ToastAndroid, Text, Image, ScrollView, TextInput } from "react-native";
import PhotoUpload from "react-native-photo-upload";
import consts from "./mapconstants";
import { addPlace } from "../actions";
import placesobject from "../placesapi.js";
import { styles } from "../style/containers/bottomview";

export default class BottomView extends Component {
  constructor(props) {
    super(props);
    this.state = { animating: false, text: "" };
  }

  addplace = avatar => {
    if (this.state.text === "") {
      ToastAndroid.showWithGravity(
        "Give some name , before to prceed!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return true;
    }
    const newCoordinate = {
      latitude:
        consts.LATITUDE + (Math.random() - 0.5) * (consts.LATITUDE_DELTA / 2),
      longitude:
        consts.LONGITUDE + (Math.random() - 0.5) * (consts.LONGITUDE_DELTA / 2)
    };
    let obj = {
      place: this.state.text,
      img: avatar,
      description: this.state.text,
      latlon: newCoordinate
    };
    placesobject.addplace(obj);
    this.props.dispatch(
      addPlace({
        type: "ADD_PLACE",
        title: this.state.text,
        id: consts.nextUserId++,
        latlng: newCoordinate,
        img: avatar
      })
    );
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ScrollView horizontal={true}>
            {this.props.places.map(p => {
              return (
                <View key={Math.random()} style={styles.centerview}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{
                      uri: `data:image/gif;base64,${p.img}`
                    }}
                  />
                  <Text style={styles.text}> {p.title}</Text>
                </View>
              );
            })}
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  this.addplace(avatar);
                }
              }}
            >
              <View>
                <Image
                  style={styles.photoimage}
                  resizeMode="cover"
                  source={require("../assets/icon.jpg")}
                />
                <TextInput
                  style={styles.textinput}
                  onChangeText={text => this.setState({ text })}
                  autoFocus={false}
                  placeholderTextColor={"#fff"}
                  placeholder={"start typing.."}
                  onSubmitEditing={this.onSubmitEditing}
                  value={this.state.text}
                />
              </View>
            </PhotoUpload>
          </ScrollView>
        </View>
      </View>
    );
  }
}
