import { nanoid } from 'nanoid';
import { type Note, type NoteContent } from '../interface/type';

function getNotes(): Note[] {
  return JSON.parse(localStorage.getItem('notes') ?? '[]') as Note[];
}

function getNoteById(id: string) {
  return getNotes().find(note => note.id === id);
}

function setNotes(notes: Note[]) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function insertNote(note: Note) {
  const notes = getNotes();
  notes.push(note);
  setNotes(notes);
}

function updateNoteById(id: string, note: Note) {
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === id);
  notes[index] = note;
  setNotes(notes);
}

function deleteNoteById(id: string) {
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === id);
  notes.splice(index, 1);
  setNotes(notes);
}

function generateNoteId() {
  return nanoid();
}

// public
function addNewNote(title: string, contentText: Array<string> = [], contentUrl: Array<string> = []) {
  const content: NoteContent[] = contentText.map((text, index) => ({
    text,
    href: contentUrl[index]
  }));
  
  const note: Note = {
    id: generateNoteId(),
    title,
    content
  };

  insertNote(note);
}

function updateNote(id: string, title: string, contentText: Array<string> = [], contentUrl: Array<string> = []) {
  const content: NoteContent[] = contentText.map((text, index) => ({
    text,
    href: contentUrl[index]
  }));
  
  const note: Note = {
    id,
    title,
    content
  };
  
  updateNoteById(id, note);
}

function deleteNote(id: string) {
  deleteNoteById(id);
}

function getAllNotes() {
  return getNotes();
}

export { addNewNote, updateNote, deleteNote, getAllNotes };