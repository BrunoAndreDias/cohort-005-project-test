import { deriveNoteEditorState } from "./lib/editor-state";

export type { NoteEditorState, NoteEditorStatus } from "./lib/editor-state";

/**
 * What the Lesson note editor shows for a draft: whether it can be saved,
 * whether it differs from the saved Note, and its length against the limit.
 */
export function noteEditorState(draft: string, savedBody: string | null) {
  return deriveNoteEditorState(draft, savedBody);
}
