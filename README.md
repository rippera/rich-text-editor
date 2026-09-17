# RichEditor

A TinyMCE-style WYSIWYG editor component with file and image uploads handled by
[`@uploadcare/file-uploader`](https://github.com/uploadcare/file-uploader).

- `src/rich-editor.js` — the editor core, framework-agnostic, no dependencies
- `src/rich-editor.css` — styles, fully tokenised
- `src/RichEditor.jsx` — React wrapper
- `src/Example.jsx` — React usage
- `demo/index.html` — vanilla demo that runs off CDN builds

## Install

```bash
npm i @uploadcare/file-uploader
```

Register the web components **once**, in your app entry, before any editor mounts:

```js
import * as UC from '@uploadcare/file-uploader';
import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';

UC.defineComponents(UC);
```

## React

```jsx
import RichTextEditor from './RichEditor.jsx';

<RichTextEditor
  value={html}
  onChange={setHtml}
  onUpload={(entry) => console.log(entry.uuid, entry.cdnUrl)}
  uploadcare={{ pubkey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBKEY }}
/>;
```

## Vanilla

```js
import { RichEditor } from './rich-editor.js';
import './rich-editor.css';

const editor = new RichEditor('#editor', {
  value: '<p>Hello</p>',
  uploadcare: { pubkey: 'YOUR_PUBLIC_KEY' },
  onChange: (html) => save(html),
});
```

## Options

| Option            | Type            | Default            | What it does                                                                                                                                                             |
| ----------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`           | string          | `''`               | Initial HTML                                                                                                                                                             |
| `placeholder`     | string          | `'Start writing…'` | Shown while empty                                                                                                                                                        |
| `toolbar`         | array of arrays | full set           | Button groups; see names below                                                                                                                                           |
| `minHeight`       | number          | `360`              | Minimum editing height in px                                                                                                                                             |
| `statusBar`       | boolean         | `true`             | Element path + word/character count                                                                                                                                      |
| `sourceView`      | boolean         | `true`             | HTML source toggle                                                                                                                                                       |
| `fullscreen`      | boolean         | `true`             | Fullscreen toggle                                                                                                                                                        |
| `disabled`        | boolean         | `false`            | Fully inert — not editable, not focusable, entire toolbar off (including source/fullscreen)                                                                              |
| `readOnly`        | boolean         | `false`            | Not editable, but still focusable/selectable/copyable. Formatting and insertion controls are off; source view and fullscreen stay usable since they don't change content |
| `uploadcare`      | object \| null  | `null`             | Uploadcare config; `null` removes the upload buttons                                                                                                                     |
| `onChange(html)`  | function        | —                  | Fires on every edit                                                                                                                                                      |
| `onUpload(entry)` | function        | —                  | Fires per successful upload with the `OutputFileEntry`                                                                                                                   |
| `onReady(editor)` | function        | —                  | Fires after mount                                                                                                                                                        |

## Toolbar

Names: `undo redo block font size bold italic underline strike sup sub fore back
alignLeft alignCenter alignRight alignJustify bullets numbers outdent indent
link unlink image attach table hr clear`.

Four config shapes are accepted, so a TinyMCE toolbar string can be pasted in
unchanged — `blocks`, `forecolor`, `bullist`, `numlist`, `strikethrough`,
`alignleft`, `removeformat` and friends are mapped to their equivalents:

```js
toolbar: 'undo redo | blocks | bold italic forecolor | bullist numlist | link image';
toolbar: ['bold', 'italic', '|', 'link', 'image']; // '|' starts a new group
toolbar: [
  ['bold', 'italic'],
  ['link', 'image'],
]; // canonical grouped form
toolbar: false; // formatting buttons off
```

Omit the option entirely for the full default set. Unknown names are skipped
with a console warning rather than breaking the build, and a toolbar that ends
up empty logs a warning telling you so.

Anything you put in `uploadcare` is converted from camelCase to kebab-case and
set as an attribute on `<uc-config>`, so the whole
[uploader config surface](https://uploadcare.com/docs/file-uploader/configuration/)
is available: `sourceList`, `multiple`, `maxLocalFileSizeBytes`, `imgOnly`,
`accept`, `cropPreset`, `useCloudImageEditor`, `secureSignature`,
`secureExpire`, `metadata`, `localeName`, and so on.

## Instance API

```js
editor.getHTML(); // current HTML (source view aware)
editor.getText(); // plain text
editor.setHTML('<p>New</p>');
editor.focus();
editor.exec('bold'); // any execCommand
editor.insertTable(3, 4);
editor.pickFiles({ imagesOnly: true }); // open the Uploadcare dialog
editor.toggleSource();
editor.toggleFullscreen();
editor.destroy();
```

In React the same methods are on the ref, plus `openUploader()` and
`instance()`.

## How the Uploadcare integration works

The editor mounts three Uploadcare elements in a zero-size host inside itself,
all sharing a generated `ctx-name` so several editors can live on one page
without interfering:

```html
<uc-config ctx-name="rich-editor-1" pubkey="…" source-list="local, url, camera">
  <uc-file-uploader-regular ctx-name="rich-editor-1" headless>
    <uc-upload-ctx-provider
      ctx-name="rich-editor-1"
    ></uc-upload-ctx-provider></uc-file-uploader-regular
></uc-config>
```

The `headless` attribute hides the uploader's own button, so the toolbar can
drive it. Clicking the image or paperclip button saves the caret position, sets
`img-only` accordingly and calls `getAPI().initFlow()` to open the dialog.

Uploadcare dispatches all of its events on `<uc-upload-ctx-provider>`. The
editor listens for `file-upload-success` and inserts at the saved caret:

- **Images** → `<img src="{cdnUrl}/-/preview/1600x1600/">`, keeping the UUID in
  a `data-uuid` attribute
- **Everything else** → a download chip linking to the CDN URL, with the file
  name and size

It also listens for `file-upload-failed` (logged) and `modal-close`, where it
calls `removeAllFiles()` so the next open starts from an empty collection
rather than re-showing previous files.

Dragging a file onto the editor, or pasting one from the clipboard, is
intercepted and handed to `api.addFileFromObject()`, so those go through the
same pipeline and end up as CDN URLs rather than base64 blobs.

## Things worth setting up properly

**Signed uploads.** A public key alone lets anyone upload to your project.
For anything user-facing, generate a `secureSignature` / `secureExpire` pair on
your server and pass them in the `uploadcare` object. See
[Uploadcare's security settings](https://uploadcare.com/docs/security/secure-uploads/).

**If `@uploadcare/react-uploader` is already used elsewhere in your app**
(as in an existing upload field component), be careful with the
`UC.defineComponents(UC)` call from the Quick start above. `customElements
.define()` throws if a tag is registered twice, and `@uploadcare/react-uploader`
already registers `uc-config`, `uc-file-uploader-regular` and
`uc-upload-ctx-provider` — the same tags this library uses — the first time
one of its components renders. If your app entry also calls
`UC.defineComponents(UC)` unconditionally, whichever import runs second throws
`NotSupportedError`, and depending on where that lands in your bundle it can
silently break unrelated things that load afterward — including, for
instance, a toolbar button whose click handler never got wired up.

Guard it:

```js
import * as UC from '@uploadcare/file-uploader';
try {
  UC.defineComponents(UC);
} catch {
  // Already registered by @uploadcare/react-uploader elsewhere in the app — fine.
}
```

Both packages wrap the exact same underlying web components, so this editor
works correctly alongside an existing `@uploadcare/react-uploader` field; it
just doesn't need a second registration.

**Orphaned files.** If a user uploads an image and then deletes it from the
document, the file still sits in your Uploadcare project. Collect UUIDs via
`onUpload`, diff them against the UUIDs still present in the saved HTML
(`data-uuid` attributes), and delete the rest through the REST API from your
backend.

**Sanitise on the server.** The paste handler strips scripts and most
attributes, but client-side sanitising is a convenience, not a security
boundary. Run the HTML through DOMPurify or an equivalent before storing or
rendering it anywhere.

**Next.js.** The Uploadcare elements need `window`. Put `defineComponents` in a
`'use client'` module, and import the editor with
`dynamic(() => import('./RichEditor'), { ssr: false })`.

**Image transforms.** The `-/preview/1600x1600/` in the inserted `src` is a CDN
transform, not a resize of the stored file. Swap it for whatever suits —
`-/resize/1200x/-/format/auto/-/quality/smart/` is a good default for article
bodies.

## The contenteditable caveat

This core uses `document.execCommand`, which is how TinyMCE 4 and CKEditor 4
worked. Browsers still ship it, but it's deprecated and inconsistent at the
edges: nested list behaviour, undo granularity and selection handling across
block boundaries all vary by engine.

That's fine for a comment box, a CMS field or a notes panel. If you need
collaborative editing, a validated content schema, or reliable undo across
complex structures, build on a document-model editor instead — Tiptap
(ProseMirror) or Lexical — and reuse the Uploadcare wiring in
`_wireUploadcare` / `_insertUploaded` as-is. It transfers almost unchanged;
only the insert call becomes
`editor.chain().focus().setImage({ src: entry.cdnUrl }).run()`.
