import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Paragraph, Button, TextInput, HelperText } from 'react-native-paper';
import uuid from 'uuid';

import Messages from '../components/Messages';
import Input from '../components/Input';

function waitFor(conditionFunction) {

  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }

  return new Promise(poll);
}

class Chat extends Component {
  constructor() {
    super();
    this.ws = new WebSocket(process.env.WS_ADDRESS || 'ws://192.168.29.237:8080');
  }

  state = {
    connected: false,
    username: '',
    dialogIsVisible: true,
    error: ''
  }

  componentDidMount() {
    this.ws.onopen = () => {
      this.setState({
        connected: true
      })

      waitFor(_ => this.state.dialogIsVisible === false)
        .then(_ => {
          this.ws.send(JSON.stringify({
            type: 'join',
            username: this.state.username
          }))
        })
    },
    this.ws.onclose = () => {
      this.setState({
        connected: false
      })

      this.ws.send(JSON.stringify({
        type: 'leave',
        username: this.state.username
      }))
    }
  }

  usernameOnSubmit = () => {
    if (!this.state.username) this.setState({error: 'Username can\'t be empty'})
    else {
      this.setState({dialogIsVisible: false})
    }
  }

  render() {
    return (
      <>
        <Portal.Host>
          <Messages ws={this.ws} />
          <Input ws={this.ws} author={this.state.username} />
          <Portal>
            <Dialog visible={this.state.dialogIsVisible} onDismiss={this.usernameOnSubmit}>
              <Dialog.Title>Name</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Please enter your username:</Paragraph>
                <TextInput
                  mode='outlined'
                  value={this.state.username}
                  onChangeText={text => this.setState({username: text})}
                  error={true ? this.state.error : false}
                />
                <HelperText type='error' visible={true ? this.state.error : false} >
                  {this.state.error}
                </HelperText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this.usernameOnSubmit}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Portal.Host>
      </>
    )
  }
}

export default Chat;
