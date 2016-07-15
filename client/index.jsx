var React = require('react');
var ReactDOM = require('react-dom');
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

// Import the two components of the application: the list of messages and the input form.
import MessageBoard from './components/messageBoard'
import MessageInput from './components/messageInput'

// Tell Apollo Client where to find the GraphQL server.
const networkInterface = createNetworkInterface('http://localhost:3001');
const client = new ApolloClient({networkInterface});

class ChatRoom extends React.Component {
    render() {
      // ApolloProvider is very similar to the Redux store provider -- indeed, the two can be very easily integrated.  See the documentation for details!
        return (
            <ApolloProvider client={client}>
              <div>
                  <MessageBoard/>
                  <MessageInput/>
                </div>
            </ApolloProvider>
        )
    }
}

ReactDOM.render( <ChatRoom/>, document.getElementById("root"));
