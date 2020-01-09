import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyD3weaQO9nQv-z7Ksc3aIXeVlr-ok5QLF8',
  authDomain: 'https://wenzer-d276a.firebaseio.com/',
  databaseURL: 'https://wenzer-d276a.firebaseio.com/',
  projectId: 'wenzer-d276a',
  storageBucket: 'wenzer-d276a.appspot.com',
  messagingSenderId: 'OK'
};
let app = Firebase.initializeApp(config);
export const db = app.database();