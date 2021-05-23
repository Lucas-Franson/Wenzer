import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import api from '../../../services/api';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: 'Wenzer',
      credentials: {
        username: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
    },
      async authorize (credentials) {
        const user = await api.post('/api/login', credentials)
        return user.data
      },
    }),
    
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token;
      }

      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  
  database: process.env.DATABASE_URL,
});

// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
// import axios from 'axios';

// const providers = [
//   Providers.Credentials({
//     name: 'Credentials',
//     async authorize(credentials) {
//       const user = await axios.post('/api/login', credentials)

//       if (user) {
//         return user.data
//       } else {
//         return null;
//       }
//     },
//   })
// ];

// const callbacks = {
//   // Getting the JWT token from API response
//   async jwt(token, user) {
//     if (user) {
//       token.accessToken = user.token;
//     }

//     return token;
//   },

//   async session(session, token) {
//     session.accessToken = token.accessToken;
//     return session;
//   },
// };

// const options = {
//   providers,
//   callbacks,
// };

// export default (req, res) => NextAuth(req, res, options);

