import React, { Component } from 'react';
import { Text, List, Divider, Avatar } from 'react-native-paper';
import { FlatList } from 'react-native';

import Message from './Message';

const getInitialsFromName = (name) => name.match(/\b(\S)/g)?.join("").match(/(^\S|\S$)?/g).join("").toUpperCase() || ""

const renderItem = ({ item }) => (
  <Message
    title={item.author}
    description={item.content}
    left={props => <Avatar.Text size={50} label={getInitialsFromName(item.author)}/>}
  />
);

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    messages: []
  }

  componentDidMount() {
    this.props.ws.onmessage = ({data}) => {
      const message = JSON.parse(data);
      this.setState(state => {
        return {
          messages: state.messages.concat({
            author: message.author,
            content: message.content,
            key: message.id
          })
        }
      })
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        ref={ref => this.listRef = ref}
        onContentSizeChange={() => this.listRef.scrollToEnd()}
      />
    );
  }
}

export default Messages;
