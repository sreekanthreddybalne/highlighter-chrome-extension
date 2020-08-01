// import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as HighlightCard from './highlight-card'
var serviceAccount = require("../lib/highlighter-2020-firebase-adminsdk-lz3dj-b1068ee8b0");
// admin.initializeApp(functions.config().firebase)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://highlighter-2020.firebaseio.com"
});

exports.createHighlightCard = HighlightCard.createHighlightCard;