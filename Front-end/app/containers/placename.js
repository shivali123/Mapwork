import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "../style/containers/addplacename";

export default class Placename extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerview}>
          <Text> Place? </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.props.updatePlace(text)}
            autoFocus={true}
            onSubmitEditing={this.props.onSubmitEditing}
            value={this.props.text}
          />
        </View>
      </View>
    );
  }
}
