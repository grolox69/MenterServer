import * as admin from 'firebase-admin';
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase Admin Initialized");

const auth = admin.auth();

export default auth;