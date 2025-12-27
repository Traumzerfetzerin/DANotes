import { Component } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteListService } from '../firebase-services/note-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';


@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NoteComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})


export class NoteListComponent {
  noteList: Note[] = [];
  favFilter: "all" | "fav" = "all";
  status: "notes" | "trash" = "notes";


  /**
   * Constructor for the NoteListComponent class.
   * Initializes the note list component with the NoteListService.
   * @param {NoteListService} noteService The NoteListService to use for the note list component.
   */
  constructor(private noteService: NoteListService) {
    this.noteList = this.getDummyData()
  }


  /**
   * Returns the list of notes that are not in the trash.
   * @returns {Note[]} - The list of notes that are not in the trash.
   */
  getList(): Note[] {
    return this.noteService.normalNotes;
  }

  
  /**
   * Returns the list of notes that are in the trash.
   * @returns {Note[]} - The list of notes that are in the trash.
   */
  getTrashList(): Note[] {
    return this.noteService.trashNotes;
  }


  /**
   * Changes the favorite filter of the note list.
   * @param {string} filter The filter to change to. Either 'all' or 'fav'.
   */
  changeFavFilter(filter: "all" | "fav") {
    this.favFilter = filter;
  }


  /**
   * Toggles the status of the note list between 'notes' and 'trash'.
   * If the status is 'trash', it sets the status to 'notes'.
   * If the status is 'notes', it sets the status to 'trash' and the favFilter to 'all'.
   */
  changeTrashStatus() {
    if (this.status == "trash") {
      this.status = "notes";
    } else {
      this.status = "trash";
      this.favFilter = "all";
    }
  }


  /**
   * Returns a list of dummy notes.
   * @returns {Note[]} - A list of dummy notes.
   */
  getDummyData(): Note[] {
    return [
      {
        id: "21sasd561dd4sdf",
        type: "note",
        title: "Block, Inline, and Inline-Block",
        content: "https://www.youtube.com/watch?v=x_i2gga-sYg",
        marked: true,
      },
      {
        id: "25sd4f561w54sdf",
        type: "note",
        title: "css selector",
        content: `kind p > b   (direktes kind) 
        nachfahren p b  (alle nachfahren)
        geschwister p ~ b (auf gleicher ebene ist VOR dem p ein b)`,
        marked: true,
      },
      {
        id: "54a4s6d546ff",
        type: "note",
        title: "aufräumen",
        content: "Wohnzimmer saugen",
        marked: false,
      },
      {
        id: "2a35s4d654a6s4d",
        type: "note",
        title: "links",
        content: `Reihenfolge: a:visited 
        a:focus 
        a:hover 
        a:active
        merkspruch: LoVe HAte`,
        marked: true,
      }
    ];
  }
}
