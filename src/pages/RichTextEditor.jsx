import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./RichTextEditor.css";

export default function RichTextEditor({ value, onChange }) {
const editor = useEditor({
extensions: [StarterKit],
content: value || "",
immediatelyRender: false,
onUpdate: ({ editor }) => {
onChange(editor.getHTML());
},
editorProps: {
attributes: {
class: "ub-rich-editor__content",
"aria-label": "Article content editor",
},
},
});

if (!editor) {
return <div className="ub-rich-editor-loading">Loading editor...</div>;
}

const buttons = [
{
label: "B",
title: "Bold",
action: () => editor.chain().focus().toggleBold().run(),
active: editor.isActive("bold"),
},
{
label: "I",
title: "Italic",
action: () => editor.chain().focus().toggleItalic().run(),
active: editor.isActive("italic"),
},
{
label: "H2",
title: "Heading 2",
action: () =>
editor.chain().focus().toggleHeading({ level: 2 }).run(),
active: editor.isActive("heading", { level: 2 }),
},
{
label: "H3",
title: "Heading 3",
action: () =>
editor.chain().focus().toggleHeading({ level: 3 }).run(),
active: editor.isActive("heading", { level: 3 }),
},
{
label: "• List",
title: "Bullet list",
action: () => editor.chain().focus().toggleBulletList().run(),
active: editor.isActive("bulletList"),
},
{
label: "1. List",
title: "Numbered list",
action: () => editor.chain().focus().toggleOrderedList().run(),
active: editor.isActive("orderedList"),
},
{
label: "Quote",
title: "Blockquote",
action: () => editor.chain().focus().toggleBlockquote().run(),
active: editor.isActive("blockquote"),
},
{
label: "↶",
title: "Undo",
action: () => editor.chain().focus().undo().run(),
active: false,
},
{
label: "↷",
title: "Redo",
action: () => editor.chain().focus().redo().run(),
active: false,
},
];

return ( 
<div className="ub-rich-editor"> 
    <div className="ub-rich-editor__toolbar" role="toolbar" aria-label="Article formatting">
{buttons.map((button) => (
<button
key={button.title}
type="button"
title={button.title}
aria-label={button.title}
aria-pressed={button.active}
className={button.active ? "is-active" : ""}
onMouseDown={(event) => event.preventDefault()}
onClick={button.action}
>
{button.label} </button>
))}
<button
type="button"
title="Add or remove link"
onMouseDown={(event) => event.preventDefault()}
onClick={() => {
if (editor.isActive("link")) {
editor.chain().focus().unsetLink().run();
return;
}


        const url = window.prompt("Enter the link URL (include https://):");
        if (url) {
          try {
            const parsed = new URL(url);
            if (!["http:", "https:"].includes(parsed.protocol)) {
              window.alert("Please enter a valid HTTP or HTTPS link.");
              return;
            }

            editor.chain().focus().extendMarkRange("link").setLink({ href: parsed.href }).run();
          } catch {
            window.alert("Please enter a valid URL, including https://");
          }
        }
      }}
    >
      Link
    </button>
    <button
      type="button"
      title="Clear formatting"
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
    >
      Clear
    </button>
  </div>

  <EditorContent editor={editor} />
</div>

);
}