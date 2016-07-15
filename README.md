# apolloChatRoomDemo
This is a bare-bones chatroom exercise in [Apollo[Client/Server]](http://www.apollostack.com/), GraphQL, and React.  At the time of writing, the Apollo documentation is not the most transparent and there are relatively few demos of the technology out there.  I was frustrated by the dichotomy of the demos that _are_ out there; they are either dead-simple or a fully featured application.  Hopefully, the one query and one mutation in this project strike some balance.

____
## Parts:
  * __Server:__ Apollo Server uses an Express instance to handle requests (queries and mutations).  The GraphQL side consists of an in-memory variable to hold the chat log, a schema, and some 'resolver' functions.
  * __Client:__ Two React components are loaded into Apollo-Client containers for querying all the chat room's messages or mutating new messages.
  
____
## Running the Demo
1. ```git clone https://github.com/jangerhofer/apolloChatRoomDemo.git && cd apolloChatRoomDemo/```
2. `npm install`
3. `npm run server` will start the GraphQL server.
4. You will now need a secondary terminal window to run the client/development-server.  cd into the `apolloChatRoomDemo` directory and run `npm start`.
5. Navigate to [localhost:3000](http://localhost:3000).
