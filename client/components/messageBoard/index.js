import React from 'react'
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import FlipMove from 'react-flip-move';

var style = require('./style.sass')

const messageBoard = (props) => {
  // Check if data is loading to prevent two logs (one when component loads and query begins and second when component is updated upon query return)
  if (!props.messages.loading) {
    if (props.messages.messages.length <= 0) {
      return <p className="chatbox">No messages yet :(</p>
    }
    return (

      // FlipMove will animate new additions to the list; I chose a little fade in.  The messages prop. will be iterated over to display each message in the chat room.
      <ul className="chatbox">
        <FlipMove duration={1000} enterAnimation={{
        from: {
          opacity : 0
        },
        to: {
          opacity : 1
        }
      }}>
        {props.messages.messages.map( (message, index) =>
          (<li className="message" key={index}><b>{message.author}</b> -- {message.content}</li>)
        )}
        </FlipMove>
      </ul>
    )

  }
  // If data is still loading, display loading message.
  else {
    return <p className="chatbox">Loading...</p>
  }

}

// This, unlike the messageInput mutation, is kosher per the Apollo documentation.  We get quasi-reactivity using "pollInterval", which sets how often the query re-runs in milliseconds.
function mapQueriesToProps({ ownProps, state }) {
  return {
    messages : {
      pollInterval : 200,
      query : gql `
        query {
          messages {
            content
            author
          }
         }
      `
    }
  }
}

// Connecting the query to the component as a container
const messageBoardWithData = connect({
  mapQueriesToProps,
})(messageBoard);

export default messageBoardWithData;
