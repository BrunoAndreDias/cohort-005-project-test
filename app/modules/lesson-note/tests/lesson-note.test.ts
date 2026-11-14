import { describe, expect, it } from "vitest";
import { noteEditorState } from "../index";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

describe("noteEditorState", () => {
  it("cannot save a blank draft when there is no note yet", () => {
    expect(noteEditorState("", null)).toEqual({
      status: "unchanged",
      canSave: false,
      length: 0,
      maxLength: MAX_NOTE_LENGTH,
    });
  });

  it("cannot save a draft that is only whitespace", () => {
    const state = noteEditorState("   \n ", "Types are erased");
    expect(state.status).toBe("empty");
    expect(state.canSave).toBe(false);
    expect(state.length).toBe(0);
  });

  it("can save a new draft", () => {
    const state = noteEditorState("Types are erased", null);
    expect(state.status).toBe("unsaved");
    expect(state.canSave).toBe(true);
    expect(state.length).toBe(16);
  });

  it("treats the saved note as unchanged", () => {
    const state = noteEditorState("Types are erased", "Types are erased");
    expect(state.status).toBe("unchanged");
    expect(state.canSave).toBe(false);
  });

  it("ignores surrounding whitespace, as the save does", () => {
    const state = noteEditorState("  Types are erased\n", "Types are erased");
    expect(state.status).toBe("unchanged");
    expect(state.length).toBe(16);
  });

  it("can save an edit to the saved note", () => {
    const state = noteEditorState("Types are erased at runtime", "Types");
    expect(state.status).toBe("unsaved");
    expect(state.canSave).toBe(true);
  });

  it("allows a draft exactly at the limit", () => {
    const state = noteEditorState("a".repeat(MAX_NOTE_LENGTH), null);
    expect(state.status).toBe("unsaved");
    expect(state.canSave).toBe(true);
  });

  it("refuses a draft over the limit", () => {
    const state = noteEditorState("a".repeat(MAX_NOTE_LENGTH + 1), null);
    expect(state.status).toBe("too-long");
    expect(state.canSave).toBe(false);
    expect(state.length).toBe(MAX_NOTE_LENGTH + 1);
  });

  it("refuses an over-limit draft even when it matches the saved note", () => {
    const long = "a".repeat(MAX_NOTE_LENGTH + 1);
    expect(noteEditorState(long, long).status).toBe("too-long");
  });
});
