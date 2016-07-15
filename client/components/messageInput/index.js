import React from 'react'
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

import './style.sass'

// Class responsible for gathering username and message and sending new messages to the server.
class messageInput extends React.Component {

    constructor(props) {
        super(props)

        // Separate states for the two text-entry boxes.
        this.state = {
            handle: "",
            message: ""
        }
    }

    // Handlers for entering text into the two input boxes.
    handleChange(event) {
        this.setState({
            handle: event.target.value
        })
    }
    messageChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    // The Apollo-Client way of dispatching a GraphQL mutation.  If a state manager was used, this class method would dispatch an action which would, in turn, dispatch that mutation.
    sendMessage(event) {
        this.props.mutations.addMessage(this.state.handle, this.state.message)
        event.preventDefault()
        this.setState({
            message: ""
        })
        document.getElementById("messageInput").focus()
    }

    render () {
      return <form id="messageEntry" onSubmit={this.sendMessage.bind(this)}>
       <input id="handleInput" placeholder="Username" value={this.state.handle} onChange={this.handleChange.bind(this)} type="text"/>
       <input id="messageInput" placeholder="A message..." value={this.state.message} onChange={this.messageChange.bind(this)} type="text"/>
       <button type="submit">Send</button>
      </form>
    }
}


// NOTE: This is not the recommended way to handle mutations.  The documentation was a little murky when I wrote this and I couldn't avoid server errors when I followed the documentations example, so I'm hard-coding the variables using ES6 interpolation.
function mapMutationsToProps({ ownProps, state }) {
  return {
    addMessage: (handle, message) => ({
      mutation: gql`
      mutation {
        addMessage(author : "${handle}", content : "${message}") {
          content
        }
      }
  `,
    }),
  };
};

// Use Apollo Client "connect" as a container for data loading.
const messageInputWithData = connect({
mapMutationsToProps
})(messageInput);

export default messageInputWithData;
