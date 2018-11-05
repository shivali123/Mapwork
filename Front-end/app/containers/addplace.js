import React from "react";
import {
  View,
  TouchableOpacity,
  ToastAndroid,
  Text,
  Image
} from "react-native";
//  all redux
import { connect } from "react-redux";
import { addPlace } from "../actions";
// all library
import MapView from "react-native-maps";
import ImagePicker from "react-native-image-picker";
var RNFS = require("react-native-fs");
//  all styling
import { customStyle } from "../style/customMapStyle";
import { styles } from "../style/containers/addplace";
//  all constants
import { initialRegion } from "./initialregion";
import consts from "./mapconstants";
//  all views
import Loader from "./loader";
import Placename from "./placename";
import BottomView from "./bottomView";
import Markerlist from "./markerlist";
import Routes from "./routes";
import placesobject from "../placesapi.js";
import BottomButtons from "./bottombuttons";
//  all local variables
var obj;

class AddPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textinput: false,
      latlong: {},
      region: {},
      routestate: false,
      animating: false,
      viewmarker: false,
      mode: "driving"
    };
  }

  componentDidMount() {
    placesobject.getPlaces(this.props.dispatch);
  }

  onLongPress = data => {
    let coordinate = data.nativeEvent.coordinate;
    this.setState({ latlon: coordinate, textinput: true, animating: true });
  };

  updatePlace = place => {
    this.setState({ text: place });
  };

  updateanimate = () => {
    this.setState({ routestate: false });
  };

  onSubmitEditing = () => {
    this.setState({ textinput: false });
    if (this.state.text === "") {
      ToastAndroid.showWithGravity(
        "Add place name to proceed!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      obj.setState({ animating: false });
      return;
    }
    let placetitle = this.state.text;
    let coordinates = this.state.latlon;
    ImagePicker.showImagePicker(
      { title: "Pick an Image", maxWidth: 800, maxHeight: 600 },
      res => {
        if (res.didCancel) {
          obj.setState({ animating: false, text: "", textinput: false });
        } else if (res.error) {
          obj.setState({ animating: false, textinput: false, text: "" });
        } else {
          RNFS.readFile(res.uri, "base64").then(image => {
            let obj = {
              place: placetitle,
              img: String(image),
              description: placetitle,
              latlon: coordinates
            };
            placesobject.addplace(obj)
            this.props.dispatch(
              addPlace({
                type: "ADD_PLACE",
                title: placetitle,
                id: consts.nextUserId++,
                latlng: coordinates,
                img: image
              })
            );
          });
          obj.setState({ animating: false, text: "", textinput: false });
        }
      }
    );
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  marker = data => {
    this.setState({ marker: data, viewmarker: true });
  };

  viewmarker() {
    if (this.state.viewmarker === true) {
      return (
        <View style={styles.calout}>
          <Text
            style={styles.close}
            onPress={() => this.setState({ viewmarker: false })}
          >
            CLOSE
          </Text>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: `data:image/gif;base64,${this.state.marker.img}`
            }}
          />
          <Text style={styles.text}>{this.state.marker.title}</Text>
        </View>
      );
    }
  }

  setroute = status => {
    this.setState({ routestate: status });
  };

  modeselector() {
    if (this.state.routestate === true) {
      return (
        <View style={styles.mode}>
          <TouchableOpacity onPress={() => this.setState({ mode: "walking" })}>
            <Image
              style={styles.photoimage}
              resizeMode="cover"
              source={require("../assets/walking.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ mode: "driving" })}>
            <Image
              style={styles.photoimage}
              resizeMode="cover"
              source={require("../assets/driving.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ mode: "bicycling" })}
          >
            <Image
              style={styles.photoimage}
              resizeMode="cover"
              source={require("../assets/cycling.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    obj = this;
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          customMapStyle={customStyle}
          initialRegion={initialRegion}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
          onPress={data => this.onLongPress(data)}
        >
          <Markerlist places={this.props.places} marker={this.marker} />
          <Routes
            places={this.props.places}
            obj={this}
            mode={this.state.mode}
            initialRegion={this.state.region}
            routestate={this.state.routestate}
          />
        </MapView>
        {this.viewmarker()}
        {this.modeselector()}
        {this.state.animating === true && (
          <Loader animating={this.state.animating} />
        )}
        {this.state.textinput === true && (
          <Placename
            onSubmitEditing={this.onSubmitEditing}
            text={this.state.text}
            updatePlace={this.updatePlace}
          />
        )}
        {this.state.textinput === false && (
          <BottomView
            places={this.props.places}
            dispatch={this.props.dispatch}
          />
        )}
        {this.state.textinput === false && (
          <BottomButtons setroute={this.setroute} />
        )}
      </View>
    );
  }
}

export default connect(store => store)(AddPlace);
