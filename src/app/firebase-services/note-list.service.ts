import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';


@Injectable({
  providedIn: 'root'
})


export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  items$;
  firestore: Firestore = inject(Firestore);

  constructor() { 
    this.items$ = collectionData(this.getNotesRef())
  }


  // conat itemCollection = collection(this.firestore, 'items');


  /**
   * Return a reference to the 'notes' collection in Firestore.
   * @returns {collection} A reference to the 'notes' collection in Firestore.
   */
  getNotesRef() {
    return collection(this.firestore, 'notes');
  }


  /**
   * Return a reference to the 'trash' collection in Firestore.
   * @returns {collection} A reference to the 'trash' collection in Firestore.
   */
  getTrashRef() {
    return collection(this.firestore, 'trash');
  }


  /**
   * Return a reference to a single document in Firestore.
   * @param {string} colId The id of the collection.
   * @param {string} docId The id of the document.
   * @returns {doc} A reference to the single document in Firestore.
   */
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
