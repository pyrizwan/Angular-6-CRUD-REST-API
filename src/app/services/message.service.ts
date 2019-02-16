import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


@Injectable({
  providedIn: 'root'
})
export class MessageService {
 animalInfo: Observable<any>;
 ref = firebase.firestore().collection('messages');

  constructor(private db: AngularFirestore) { }

  addShare(msgid,thread_id,msg) {
   
  

    this.db.collection("messages").add({
     msgid:msgid,
     role:msg.role,
     message:msg.message,
     createdAt:Date.now()
  })

   
  //const obj = this.db.database.ref(this.basePath);
  //obj.push(data);
  console.log('Success');

  }

  getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            key: doc.id,
            role: data.role,
            msgid: data.msgid,
            message: data.message
          });
        });
        observer.next(boards);
      });
    });
  }
  
  getBoard(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
            role: data.role,
            msgid: data.msgid,
            message: data.message
        });
      });
    });
  }
  
  postBoards(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }
  
  updateBoards(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }
  
  deleteBoards(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }

}