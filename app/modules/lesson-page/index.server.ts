import { loadLessonPage } from "./lib/load.server";
import { handleLessonAction } from "./lib/action.server";

/**
 * Everything the Lesson page needs: what a person may see of the Lesson, and
 * what each form on it does. Both check permissions themselves, and throw a
 * response when the request cannot continue.
 */
export const lessonPage = {
  load: loadLessonPage,
  act: handleLessonAction,
};
