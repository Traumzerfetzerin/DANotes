import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteListService } from '../../firebase-services/note-list.service'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})


export class NoteComponent {
  @Input() note!: Note;
  edit = false;
  hovered = false;

  constructor(private noteService: NoteListService) { }


  /**
   * Toggles the marked status of the note and saves the note.
   * @return {void} - Nothing is returned.
   */
  changeMarkedStatus() {
    this.note.marked = !this.note.marked;
    this.saveNote();
  }


  /**
   * Sets the hovered status of the note to false if the note is not being edited.
   */
  deleteHovered() {
    if (!this.edit) {
      this.hovered = false;
    }
  }


  /**
   * Opens the edit form for the note.
   */
  openEdit() {
    this.edit = true;
  }


  /**
   * Closes the edit form for the note and saves the note.
   */
  closeEdit() {
    this.edit = false;
    this.saveNote();
  }


  /**
   * Move the note to the trash.
   */
  moveToTrash() {
    if (this.note.id) {
      this.note.type = 'trash';
      let docId = this.note.id;
      delete this.note.id;
      this.noteService.addNote(this.note, "trash")
      this.noteService.deleteNote("notes", docId);
    }
  }


  /**
   * Move the note to the notes section.
   */
  moveToNotes() {
    if (this.note.id) {
      this.note.type = 'note';
      let docId = this.note.id;
      delete this.note.id;
      this.noteService.addNote(this.note, "notes")
      this.noteService.deleteNote("trash", docId);
    }
  }


  /**
   * Deletes the note from the note list service.
   */
  deleteNote() {
    if (this.note.id) {
      this.noteService.deleteNote("trash", this.note.id);
    }
  }


  /**
   * Saves the note to the note list service.
   * @returns {void} - Nothing is returned.
   */
  saveNote() {
    this.noteService.updateNote(this.note);
  }
}
