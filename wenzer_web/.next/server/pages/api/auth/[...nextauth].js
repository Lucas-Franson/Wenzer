(function() {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 2653:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _nextauth_; }
});

;// CONCATENATED MODULE: external "next-auth"
var external_next_auth_namespaceObject = require("next-auth");;
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers"
var providers_namespaceObject = require("next-auth/providers");;
var providers_default = /*#__PURE__*/__webpack_require__.n(providers_namespaceObject);
// EXTERNAL MODULE: ./src/services/api.ts + 1 modules
var api = __webpack_require__(1224);
;// CONCATENATED MODULE: ./src/pages/api/auth/[...nextauth].tsx



/* harmony default export */ var _nextauth_ = (external_next_auth_default()({
  // Configure one or more authentication providers
  providers: [providers_default().Credentials({
    name: 'Wenzer',
    credentials: {
      username: {
        label: "Email",
        type: "email"
      },
      password: {
        label: "Password",
        type: "password"
      }
    },

    async authorize(credentials) {
      const user = await api/* default.post */.Z.post('/api/login', credentials);
      return user.data;
    }

  })],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days

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
    }

  },
  database: process.env.DATABASE_URL
})); // import NextAuth from 'next-auth';
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

/***/ }),

/***/ 1224:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ services_api; }
});

;// CONCATENATED MODULE: external "axios"
var external_axios_namespaceObject = require("axios");;
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./src/services/api.ts

let urls = {
  development: 'http://localhost:3000/',
  production: 'https://wenzer.com/'
};
const api = external_axios_default().create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
/* harmony default export */ var services_api = (api);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(2653));
module.exports = __webpack_exports__;

})();