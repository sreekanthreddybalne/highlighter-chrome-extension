// const PROJECTID = 'bookopera-9676';
import * as functions from 'firebase-functions';
// import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/lib/providers/https';
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
export interface Highlight{
    text: string;
    tags?: string[];
}

export interface HighlightCard{
    title: string;
    link: string;
    highlights?: Highlight[];
}

declare type MethodDecorator = <T>(
  data: any,
  context: functions.https.CallableContext
 ) => TypedPropertyDescriptor<T> | void;
 

 function allowAuth(message: string): MethodDecorator {
  console.log(`${message} evaluated`);
  return function(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): void {
    console.log(`${message} called`);
  };
 }
 
const addHighlightCard$ = function(highlightCard: HighlightCard): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>{
  return admin.firestore().collection("highlightCards").add(highlightCard);
}

const addHighlightToHighlightCard$ = function(
  highlightCardRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  highlight: Highlight){
  return highlightCardRef.collection('highlights').add(highlight);
}

export const createHighlightCard = functions.https.onCall((data, context)=>{
  context.auth
    console.log("sreeeeeeeeeeeeeeeeeee")
    console.log(data)
    const { title, link, highlight } = data;
    if(!title || !link || !highlight.text){
        return new HttpsError("data-loss", "data is invalid");
    }
    let query = admin.firestore().collection('highlightCards').where("link", "==", link).get();
    return query.then(querySnapshot=>{
      if(querySnapshot.empty){
        return addHighlightCard$({title, link}).then(highlightCardRef=>{
          return addHighlightToHighlightCard$(highlightCardRef, highlight);
        })
      }else{
        return addHighlightToHighlightCard$(querySnapshot.docs[0].ref, highlight);
      }
    })
});
