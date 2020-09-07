import React, { Component } from 'react';
import { Text, List } from 'react-native-paper';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <List.Item {...this.props} />
    );
  }
}

export default Message;
