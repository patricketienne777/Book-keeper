const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

// const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your GraphQL resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply Apollo Server as middleware to your Express app

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
});

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
