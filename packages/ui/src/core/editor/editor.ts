import { EditorView, minimalSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { sql, SQLite } from "@codemirror/lang-sql";

let editor: EditorView;

export const setup = () => {
  editor = new EditorView({
    extensions: [
      minimalSetup,
      autocompletion(),
      keymap.of(completionKeymap),
      sql({
        dialect: SQLite,
        schema: {
          message: [
            {
              label: "topic",
            },
            {
              label: "partition",
            },
            {
              label: "payload",
            },
          ],
        },
      }),
    ],
    parent: document.querySelector("#editor") as HTMLDivElement,
  });
};

export const getQuery = () => {
  console.log(editor.state.doc.toString());
  return editor.state.doc.toString();
};
