import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteEditorStatus = "empty" | "unchanged" | "unsaved" | "too-long";

export type NoteEditorState = {
  status: NoteEditorStatus;
  canSave: boolean;
  length: number;
  maxLength: number;
};

// Measured on the trimmed draft because the save action trims before it
// checks the length, so trailing whitespace never pushes a note over the limit.
export function deriveNoteEditorState(
  draft: string,
  savedBody: string | null
): NoteEditorState {
  const body = draft.trim();
  const length = body.length;
  const status = statusOf(body, savedBody ?? "");
  return {
    status,
    canSave: status === "unsaved",
    length,
    maxLength: MAX_NOTE_LENGTH,
  };
}

function statusOf(body: string, saved: string): NoteEditorStatus {
  if (body.length > MAX_NOTE_LENGTH) return "too-long";
  if (body === saved) return "unchanged";
  if (body.length === 0) return "empty";
  return "unsaved";
}
