import {
    apolloServer
} from 'apollo-server';
import express from 'express'
import cors from 'cors'
import color from 'chalk'

// The CORS modules is necessary because this GraphQL server is seperate from the front-end webserver (webpack-dev-server) and runs on a different port.
var app = express().use('*', cors());
const GRAPHQL_PORT = 3001

// Empty variable to hold chatroom messages.  New messages will be pushed to the front of the array as they come in.
let roomContents = []

// The schema defines, of course, how GraphQL should resolve our queries into information.
const schema = `
type Message {
  author : String
  content : String
  date : String
}

type RootQuery {
  messages : [Message],
  author : String
}

type RootMutation {
  addMessage(
    author : String!
    content : String!
  ) : [Message]
}

schema {
  query : RootQuery
  mutation : RootMutation
}
`

// Resolvers tell GraphQL how to change complex fields (non-scalar fields) into 'basic', scalar data.
const resolvers = {
    RootQuery: {
        messages: (_, args) => {
          return roomContents
        }
    },
    RootMutation: {
        addMessage: (root, args) => {
            args.date = new Date()
            roomContents.unshift(args)
            return roomContents
        }
    },
    Message: {
        author(root, args) {
          return root.author
        }
    }
}

// Set up path to serve GraphQL response.  Try visiting the URL printed in your console when you start up the app to see the GraphQL server interface.
app.use('/', apolloServer({
    schema,
    resolvers,
    graphiql: true,
    prettify: true,
    formatError : function(err) {
      console.log(color.red(err));
    }
}));

// Start Express and the GraphQL server.
app.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
