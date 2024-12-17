export interface Note {
  id: string;
  title: string;
  content: Array<NoteContent>;
};
  
export interface NoteContent {
  text: string;
  href: string;
};
