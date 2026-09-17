import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { RichEditor as Core } from './rich-editor.js';
import './rich-editor.css';

const RichTextEditor = forwardRef(function RichTextEditor(props, ref) {
  const {
    value = '',
    onChange,
    onUpload,
    uploadcare = null,
    placeholder,
    toolbar,
    minHeight = 420,
    statusBar,
    sourceView,
    fullscreen,
    theme = 'light', // 'light' | 'dark' | undefined (follows the OS)
    name, // when set, onChange fires as { target: { name, id, value } }
    id,
    disabled = false, // fully inert: no editing, no focus, whole toolbar off
    readOnly = false, // not editable, but still focusable/selectable; source & fullscreen stay usable
    className = '',
    style,
  } = props;

  const hostRef = useRef(null);
  const editorRef = useRef(null);
  const lastEmitted = useRef(value);
  const onChangeRef = useRef(onChange);
  const onUploadRef = useRef(onUpload);
  const nameRef = useRef(name);
  const idRef = useRef(id);

  onChangeRef.current = onChange;
  onUploadRef.current = onUpload;
  nameRef.current = name;
  idRef.current = id;

  // Mount once. Config that would force a remount is intentionally not in deps;
  // change `key` on the element if you need a hard reset.
  useEffect(() => {
    // Props the caller didn't set arrive as `undefined`. Passing those through
    // would overwrite the core's defaults (and leave you with no toolbar), so
    // drop them and let the core decide.
    const defined = Object.fromEntries(
      Object.entries({
        placeholder,
        toolbar,
        minHeight,
        statusBar,
        sourceView,
        fullscreen,
        uploadcare,
        disabled,
        readOnly,
      }).filter(([, v]) => v !== undefined)
    );

    const editor = new Core(hostRef.current, {
      value,
      ...defined,
      onChange: (html) => {
        lastEmitted.current = html;
        if (!onChangeRef.current) return;
        if (nameRef.current !== undefined) {
          // Matches what a native <input onChange> or a TinyMCE field
          // wrapper hands a generic form handler.
          onChangeRef.current({
            target: { name: nameRef.current, id: idRef.current, value: html },
          });
        } else {
          onChangeRef.current(html);
        }
      },
      onUpload: (entry) => onUploadRef.current?.(entry),
    });
    editorRef.current = editor;
    return () => {
      editor.destroy();
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply external value changes without clobbering in-progress typing.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (value !== lastEmitted.current) {
      lastEmitted.current = value;
      editor.setHTML(value);
    }
  }, [value]);

  useEffect(() => {
    editorRef.current?.setDisabled(disabled);
  }, [disabled]);
  useEffect(() => {
    editorRef.current?.setReadOnly(readOnly);
  }, [readOnly]);

  useEffect(() => {
    if (!hostRef.current) return;
    if (theme) hostRef.current.setAttribute('data-theme', theme);
    else hostRef.current.removeAttribute('data-theme');
  }, [theme]);

  useImperativeHandle(
    ref,
    () => ({
      getHTML: () => editorRef.current?.getHTML() ?? '',
      getText: () => editorRef.current?.getText() ?? '',
      setHTML: (html) => editorRef.current?.setHTML(html),
      focus: () => editorRef.current?.focus(),
      exec: (cmd, val) => editorRef.current?.exec(cmd, val),
      openUploader: (opts) => editorRef.current?.pickFiles(opts),
      instance: () => editorRef.current,
    }),
    []
  );

  return <div ref={hostRef} id={id} className={className} style={style} />;
});

export default RichTextEditor;
