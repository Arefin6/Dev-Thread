"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef, Ref } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  //   type MDXEditorProps,
} from "@mdxeditor/editor";

interface Props {
  value: string;
  editorRef: Ref<MDXEditorMethods> | null;
  fieldChange: (value: string) => void;
}

// Only import this to the next file
export default function Editor({ value, editorRef, fieldChange }: Props) {
  return (
    <MDXEditor
      markdown={value}
      onChange={fieldChange}
      ref={editorRef}
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
}
