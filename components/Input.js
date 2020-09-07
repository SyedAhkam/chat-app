import React, { Component } from 'react';
import { TextInput, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import uuid from 'uuid';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    textValue: '',
  }

  sendButtonOnPress = () => {
    //Some way to send the message
    if (this.state.textValue != '') {
      this.props.ws.send(JSON.stringify(
        {
          type: 'message',
          author: this.props.author ? this.props.author : 'Unknown user',
          content: this.state.textValue,
          id: uuid()
        }
      ))
    }
    //clear field after
    this.setState({
      textValue: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.textValue}
          onChangeText={text => this.setState({textValue: text})}
          placeholder="Enter some text :)"
          multiline={true}
          style={styles.field}
        />
        <IconButton icon='send' onPress={this.sendButtonOnPress} size={30} style={styles.button}/>
      </View>
    );
  }
}

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  field: {
    flex: 5
  },
  button: {
    flex: 1
  }
})
