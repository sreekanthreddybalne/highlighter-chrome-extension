// const PROJECTID = 'bookopera-9676';
import * as functions from 'firebase-functions';
// import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
// import { HttpsError } from 'firebase-functions/lib/providers/https';
// import { collectionData } from 'rxfire/firestore';
// import * as Firestore from '@google-cloud/firestore';
// import * as express from 'express';
// import { from } from 'rxjs';
// import { tap, switchMap } from 'rxjs/operators';
// const app = express();

// const firestore = new Firestore({
//   projectId: PROJECTID,
//   timestampsInSnapshots: true,
// });


export const createUser = functions.https.onCall((data, context)=>{
  const {displayName, photoURL, title, descriptionHtml, tagsText } = data;
  // if(!displayName || !photoURL || !title || !descriptionHtml || !tagsText){
  //   return new HttpsError("data-loss" , "data is invalid")
  // }
  admin.auth().createUser({
    displayName: displayName,
    photoURL: photoURL,
    disabled: false
  }).then(userRecord=>{
    const commaSeparatedTags: string[] = tagsText.split(",");
    let tags: any = {};
    commaSeparatedTags.forEach(t=>{
      tags[`${t.trim()}`] = true;
    });
    admin
    .firestore()
    .collection('user')
    .doc(`${userRecord.uid}`)
    .set({
      title: title,
      descriptionHtml: descriptionHtml,
      tags: tags,
      managed: true
    }, {merge: true})
  }).then(result=>{
    console.log("result",result)
    return result;
  }).catch(function(error) {
    console.log("err",error)
    return error;
  });
});

export const createProfile = functions.auth
.user()
.onCreate((userRecord, context) => {
  return admin
    .firestore()
    .collection(`user`)
    .doc(`${userRecord.uid}`)
    .set({
      email: userRecord.email,
      displayName: userRecord.displayName
    }, {merge: true});
});


export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// export const signUp = functions.https.onRequest((req, res) => {
//   const displayName = req.params.displayName;
//   const email = req.params.email;
//   const password = req.params.password;
//   if(!displayName){
//     return res.status(400).send({ message: 'Name is required'});
//   }

//     return from(firebase.auth().createUserWithEmailAndPassword(email, password)).pipe(
//       tap(userCred=>{
//         if(!userCred)return;
//         const userRef: firestore.collection(`users/${userCred.user.uid}`);
//         return userRef.set(Object.assign({}, user), { merge: true });
//         userCred.user.sendEmailVerification().then(success=>{
//           this.router.navigateByUrl('/auth/verify-email')
//         });
//       })
//     );
//  });

// exports.addMessage = functions.https.onRequest(async (request, response) => {
//   //Grab the text parameter
//   const original = request.query.text;
//   console.log("hello babay", original)
//   // const snapshot = await admin.database().ref('/messages').push({original: original});
//   // const snapshot = await firestore.collection("/messages").add({original: original});
//   let snapshot = firestore.collection("/messages").get();
//   snapshot.then(querySnapshot => {
//     querySnapshot.docs.forEach(doc => {
//       console.log("hhhhhhhhhhhh")
//     console.log(doc.data());
//     console.log("pppppppppppp")
//   });
// });
//   // snapshot.docs.map(doc=>console.log(doc.data()));
//   return firestore.collection("/messages")
//       .add({ original: original+"pp" })
//       .then(doc => {
//         return res.status(200).send(doc);
//       }).catch(err => {
//         console.error(err);
//         return res.status(404).send({ error: 'unable to store', err });
//       });
//   // res.redirect(303, snapshot.ref.toString())
// })
