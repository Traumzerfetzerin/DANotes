import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, collection, addDoc, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';


@Injectable({
  providedIn: 'root'
})


export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  // items$;
  // items;

  unsubTrash;
  unsubNotes;

  firestore: Firestore = inject(Firestore);


  constructor() {
    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();

    // this.unsubNotes = onSnapshot(this.getSingleDocRef("notes", "123456"), (element) => {
    // });


    // this.items$ = collectionData(this.getNotesRef())
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element);
    //   });
    // });
  }


  // const itemCollection = collection(this.firestore, 'items');


  /**
   * Adds a new note to the 'notes' collection in Firestore.
   * @param {Note} item - The note to be added.
   * @returns {Promise<void>} - A promise that resolves when the note has been added.
   */
  async addNote(item: Note) {
    await addDoc(this.getNotesRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log("Document written with ID: ", docRef?.id); }
    )
  }

  /**
 * Destroys all Firestore listeners and unsubscribes from the 'items' collection.
 *This function should be called in the ngOnDestroy lifecycle hook of the component.
 */
  ngonDestroy() {
    this.unsubNotes();
    this.unsubTrash();
    // this.items.unsubscribe();
  }


  /**
   * Subscribes to the 'notes' collection and logs each element in the list to the console.
   * This function should be called in the ngOnInit lifecycle hook of the component.
   * @returns {Observable<any>} - An observable of the list of elements in the 'notes' collection.
   */
  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }


  /**
   * Subscribes to the 'trash' collection and logs each element in the list to the console.
   * This function should be called in the ngOnInit lifecycle hook of the component.
   * @returns {Observable<any>} - An observable of the list of elements in the 'trash' collection.
   */
  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }


  /**
   * Converts an object to a Note object.
   * @param {object} obj The object to convert.
   * @param {string} id The id of the Note.
   * @returns {Note} The converted Note object.
   */
  setNoteObject(obj: any, id: string): Note {
    return {
      id: id,
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }
  }


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
