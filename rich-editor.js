let ctxSeq = 0;

const ICONS = {
  undo: 'M3 10h11a5 5 0 0 1 0 10h-6M7 6l-4 4 4 4',
  redo: 'M21 10H10a5 5 0 0 0 0 10h6M17 6l4 4-4 4',
  bold: 'M7 5h6.5a3.5 3.5 0 0 1 0 7H7zM7 12h7.5a3.5 3.5 0 0 1 0 7H7z',
  italic: 'M15 5h-5M14 19H9M14 5l-4 14',
  underline: 'M6 4v6a6 6 0 0 0 12 0V4M5 20h14',
  strike:
    'M4 12h16M16.5 7A4.5 4.5 0 0 0 8 8.5c0 1.5 1 2.5 3 3.5M7.5 17A4.5 4.5 0 0 0 16 15.5c0-1-.4-1.8-1.2-2.5',
  sup: 'M4 7l8 12M12 7L4 19M17 8.5a2 2 0 1 1 3.4 1.4L17 13h4',
  sub: 'M4 5l8 12M12 5L4 17M17 16.5a2 2 0 1 1 3.4 1.4L17 21h4',
  fore: 'M5 18L11 5h2l6 13M7.5 14h9',
  back: 'M14 4l6 6-8 8H6v-6zM4 21h16',
  alignLeft: 'M4 6h16M4 10h10M4 14h16M4 18h10',
  alignCenter: 'M4 6h16M7 10h10M4 14h16M7 18h10',
  alignRight: 'M4 6h16M10 10h10M4 14h16M10 18h10',
  alignJustify: 'M4 6h16M4 10h16M4 14h16M4 18h16',
  outdent: 'M9 6h11M9 12h11M9 18h11M7 9l-3 3 3 3',
  indent: 'M10 6h10M10 12h10M10 18h10M4 9l3 3-3 3',
  bullets: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  numbers:
    'M9 6h11M9 12h11M9 18h11M3.5 4.5h1V8M3 16.2c0-.9 1.8-.9 1.8 0S3 17.4 3 18.5h2',
  link: 'M10 13a4 4 0 0 0 6 .5l2-2a4 4 0 0 0-5.7-5.7L11 7M14 11a4 4 0 0 0-6-.5l-2 2A4 4 0 0 0 11.7 18l1.3-1.3',
  unlink:
    'M9 15l-1 1a3.5 3.5 0 0 1-5-5l2-2M15 9l1-1a3.5 3.5 0 0 1 5 5l-2 2M4 4l16 16',
  image: 'M3 5h18v14H3zM4 17l5-4.5 4 3.5 3-2.5 4 3.5M8.5 9.5h.01',
  attach:
    'M15 7l-6.5 6.5a2.5 2.5 0 0 0 3.5 3.5L19 10a4.5 4.5 0 0 0-6.4-6.4L5 11a6.5 6.5 0 0 0 9 9l5-5',
  table: 'M3 5h18v14H3zM3 10h18M3 14.5h18M9 5v14M15 5v14',
  hr: 'M3 12h18',
  clear: 'M7 6h12M11 6l-2.5 9M4 20l7-7M15 14l5 5M20 14l-5 5',
  code: 'M9 7l-5 5 5 5M15 7l5 5-5 5',
  fullscreen: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
};

const SWATCHES = [
  '#000000',
  '#3f4652',
  '#6b7280',
  '#9ca3af',
  '#d1d5db',
  '#ffffff',
  '#ffe066',
  '#f6b26b',
  '#e06c75',
  '#c0392b',
  '#1f5d4c',
  '#2f9e79',
  '#7bc4a8',
  '#1d4ed8',
  '#3b82f6',
  '#93c5fd',
  '#6d28d9',
  '#a855f7',
  '#db2777',
  '#f472b6',
];

const DEFAULT_TOOLBAR = [
  ['undo', 'redo'],
  ['block', 'font', 'size'],
  ['bold', 'italic', 'underline', 'strike', 'sup', 'sub'],
  ['fore', 'back'],
  ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
  ['bullets', 'numbers', 'outdent', 'indent'],
  ['link', 'unlink', 'image', 'attach', 'table', 'hr', 'clear'],
];

const CMD = {
  undo: 'undo',
  redo: 'redo',
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strike: 'strikeThrough',
  sup: 'superscript',
  sub: 'subscript',
  alignLeft: 'justifyLeft',
  alignCenter: 'justifyCenter',
  alignRight: 'justifyRight',
  alignJustify: 'justifyFull',
  bullets: 'insertUnorderedList',
  numbers: 'insertOrderedList',
  outdent: 'outdent',
  indent: 'indent',
  unlink: 'unlink',
  hr: 'insertHorizontalRule',
  clear: 'removeFormat',
};

const TITLES = {
  undo: 'Undo (Ctrl+Z)',
  redo: 'Redo (Ctrl+Y)',
  bold: 'Bold (Ctrl+B)',
  italic: 'Italic (Ctrl+I)',
  underline: 'Underline (Ctrl+U)',
  strike: 'Strikethrough',
  sup: 'Superscript',
  sub: 'Subscript',
  fore: 'Text colour',
  back: 'Highlight',
  alignLeft: 'Align left',
  alignCenter: 'Align centre',
  alignRight: 'Align right',
  alignJustify: 'Justify',
  bullets: 'Bulleted list',
  numbers: 'Numbered list',
  outdent: 'Decrease indent',
  indent: 'Increase indent',
  link: 'Insert link (Ctrl+K)',
  unlink: 'Remove link',
  image: 'Insert image',
  attach: 'Attach file',
  table: 'Insert table',
  hr: 'Horizontal rule',
  clear: 'Clear formatting',
};

const STATEFUL = [
  'bold',
  'italic',
  'underline',
  'strikeThrough',
  'superscript',
  'subscript',
  'justifyLeft',
  'justifyCenter',
  'justifyRight',
  'justifyFull',
  'insertUnorderedList',
  'insertOrderedList',
];

export class RichEditor {
  constructor(target, options = {}) {
    this.el =
      typeof target === 'string' ? document.querySelector(target) : target;
    if (!this.el) throw new Error('RichEditor: mount target not found');

    const defaults = {
      value: '',
      placeholder: 'Start writing…',
      toolbar: DEFAULT_TOOLBAR,
      minHeight: 360,
      statusBar: true,
      sourceView: true,
      fullscreen: true,
      disabled: false,
      readOnly: false,
      onChange: null,
      onUpload: null,
      onReady: null,
      /**
       * Uploadcare config. Keys are camelCase and are converted to <uc-config>
       * attributes. Set to null to disable the image/attach buttons entirely.
       */
      uploadcare: null,
    };

    // Only keys that were actually supplied may override a default. Without
    // this, a wrapper passing `toolbar={undefined}` would erase the toolbar.
    const supplied = Object.fromEntries(
      Object.entries(options).filter(([, v]) => v !== undefined)
    );
    this.opts = { ...defaults, ...supplied };
    this.opts.toolbar = normaliseToolbar(this.opts.toolbar);

    this.ctxName = `rich-editor-${++ctxSeq}`;
    this.savedRange = null;
    this.buttons = new Map();
    this._destroyers = [];

    this._buildDom();
    this._wireEditor();
    if (this.opts.uploadcare) this._wireUploadcare();

    this.setHTML(this.opts.value || '');
    this._applyLockState();
    this._refresh();
    if (this.opts.onReady) this.opts.onReady(this);
  }

  /* ------------------------------------------------------------------ DOM */

  _buildDom() {
    this.el.classList.add('re');
    this.el.innerHTML = '';

    this.toolbarEl = h('div', 're-toolbar');

    this.contentEl = h('div', 're-content');
    this.contentEl.setAttribute('contenteditable', 'true');
    this.contentEl.setAttribute('role', 'textbox');
    this.contentEl.setAttribute('aria-multiline', 'true');
    this.contentEl.dataset.placeholder = this.opts.placeholder;
    this.contentEl.style.minHeight = `${Number(this.opts.minHeight) || 360}px`;

    this.sourceEl = h('textarea', 're-source');
    this.sourceEl.spellcheck = false;
    this.sourceEl.setAttribute('aria-label', 'HTML source');
    this.sourceEl.style.minHeight = `${Number(this.opts.minHeight) || 360}px`;

    const surface = h('div', 're-surface');
    surface.append(this.contentEl, this.sourceEl);
    this.el.append(this.toolbarEl, surface);

    if (this.opts.statusBar) {
      this.crumbsEl = h('div', 're-crumbs');
      this.countEl = h('div', 're-counts');
      const status = h('div', 're-status');
      status.append(this.crumbsEl, this.countEl);
      this.el.append(status);
    }

    this.popsEl = h('div', 're-pops');
    this.el.append(this.popsEl);
    this._buildPopovers();
    this._buildDialogs();

    // Built last, and defensively: a malformed toolbar config should degrade to
    // a plain editing surface, never take the whole component down.
    try {
      this._buildToolbar();
    } catch (err) {
      console.error('RichEditor: the toolbar could not be built', err);
    }
    if (!this.toolbarEl.querySelector('button, select')) {
      console.warn(
        'RichEditor: the toolbar is empty — check the `toolbar` option.'
      );
    }
  }

  _buildToolbar() {
    const groups = this.opts.toolbar;
    groups.forEach((group, gi) => {
      const items = group.filter((name) => {
        if ((name === 'image' || name === 'attach') && !this.opts.uploadcare)
          return false;
        return true;
      });
      if (!items.length) return;
      const wrap = h('div', 're-group');
      items.forEach((name) => {
        const el = this._buildItem(name);
        if (el) wrap.append(el);
      });
      if (!wrap.children.length) return;
      if (this.toolbarEl.children.length)
        this.toolbarEl.append(h('div', 're-sep'));
      this.toolbarEl.append(wrap);
    });

    const spacer = h('div', 're-spacer');
    this.toolbarEl.append(spacer);
    const right = h('div', 're-group');
    if (this.opts.sourceView) {
      this.srcBtn = this._iconButton('code', 'View HTML source');
      this.srcBtn.classList.add('re-tip-end');
      this.srcBtn.addEventListener('click', () => this.toggleSource());
      right.append(this.srcBtn);
    }
    if (this.opts.fullscreen) {
      this.fsBtn = this._iconButton('fullscreen', 'Fullscreen');
      this.fsBtn.classList.add('re-tip-end');
      this.fsBtn.addEventListener('click', () => this.toggleFullscreen());
      right.append(this.fsBtn);
    }
    if (right.children.length) this.toolbarEl.append(right);

    // Keep the caret when a toolbar control is pressed.
    this.toolbarEl.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) e.preventDefault();
    });
  }

  _buildItem(name) {
    if (name === 'block') return this._buildBlockSelect();
    if (name === 'font') return this._buildFontSelect();
    if (name === 'size') return this._buildSizeSelect();

    if (name === 'fore' || name === 'back') {
      const btn = this._iconButton(name, TITLES[name]);
      btn.classList.add('re-swatch');
      const bar = h('span', 're-bar');
      bar.style.background = name === 'fore' ? '#c0392b' : '#ffe066';
      btn.append(bar);
      btn.addEventListener('click', () =>
        this._openPop(name === 'fore' ? this.forePop : this.backPop, btn)
      );
      this[name === 'fore' ? 'foreBar' : 'backBar'] = bar;
      return btn;
    }

    const btn = this._iconButton(name, TITLES[name] || name);
    if (name === 'undo' || name === 'alignLeft')
      btn.classList.add('re-tip-start');
    if (CMD[name]) {
      btn.dataset.state = CMD[name];
      btn.addEventListener('click', () => this.exec(CMD[name]));
    } else if (name === 'link') {
      btn.addEventListener('click', () => this.openLinkDialog());
    } else if (name === 'table') {
      btn.addEventListener('click', () => this._openPop(this.tablePop, btn));
    } else if (name === 'image') {
      btn.addEventListener('click', () => this.pickFiles({ imagesOnly: true }));
    } else if (name === 'attach') {
      btn.addEventListener('click', () =>
        this.pickFiles({ imagesOnly: false })
      );
    } else {
      console.warn(`RichEditor: unknown toolbar item "${name}" — skipped.`);
      return null;
    }
    this.buttons.set(name, btn);
    return btn;
  }

  _iconButton(icon, title) {
    const btn = h('button', 're-btn');
    btn.type = 'button';
    btn.dataset.tip = title;
    btn.setAttribute('aria-label', title);
    btn.innerHTML = svg(ICONS[icon] || ICONS.clear, icon);
    return btn;
  }

  /**
   * A <select> genuinely steals focus from the editor when its dropdown
   * opens — unlike toolbar buttons, whose mousedown we preventDefault to
   * keep focus put. That focus transfer collapses the live selection before
   * the 'change' event even fires, so by the time a change handler runs it's
   * too late to capture anything useful. This grabs the selection at
   * mousedown, while it's still intact, so the change handler can restore it.
   */
  _armSelectRangeCapture(select) {
    const capture = () => this._saveRange();
    select.addEventListener('mousedown', capture);
    select.addEventListener('focus', capture);
  }

  _buildBlockSelect() {
    const sel = h('select', 're-btn re-select re-select-block');
    sel.dataset.tip = 'Paragraph style';
    sel.setAttribute('aria-label', 'Paragraph style');
    [
      ['p', 'Paragraph'],
      ['h1', 'Heading 1'],
      ['h2', 'Heading 2'],
      ['h3', 'Heading 3'],
      ['h4', 'Heading 4'],
      ['blockquote', 'Quote'],
      ['pre', 'Code block'],
    ].forEach(([v, label]) => sel.append(new Option(label, v)));
    sel.addEventListener('change', () =>
      this.exec('formatBlock', `<${sel.value}>`)
    );
    this.blockSel = sel;
    this._armSelectRangeCapture(sel);
    return sel;
  }

  _buildFontSelect() {
    const sel = h('select', 're-btn re-select re-select-font');
    sel.dataset.tip = 'Font';
    sel.setAttribute('aria-label', 'Font');
    sel.append(new Option('Font', ''));
    [
      ['Georgia, serif', 'Georgia'],
      ['system-ui, sans-serif', 'System sans'],
      ['"IBM Plex Sans", sans-serif', 'Plex Sans'],
      ['"IBM Plex Serif", serif', 'Plex Serif'],
      ['ui-monospace, monospace', 'Monospace'],
      ['Arial, Helvetica, sans-serif', 'Arial'],
      ['"Times New Roman", serif', 'Times'],
    ].forEach(([v, label]) => sel.append(new Option(label, v)));
    sel.addEventListener('change', () => {
      if (!sel.value) return;
      this.setFontFamily(sel.value);
    });
    this.fontSel = sel;
    this._armSelectRangeCapture(sel);
    return sel;
  }

  _buildSizeSelect() {
    const sel = h('select', 're-btn re-select re-select-size');
    sel.dataset.tip = 'Font size';
    sel.setAttribute('aria-label', 'Font size');
    sel.append(new Option('Size', ''));
    ['12px', '14px', '16px', '18px', '24px', '32px', '48px'].forEach((v) =>
      sel.append(new Option(parseInt(v, 10), v))
    );
    sel.addEventListener('change', () => {
      if (!sel.value) return;
      this.setFontSize(sel.value);
    });
    this.sizeSel = sel;
    this._armSelectRangeCapture(sel);
    return sel;
  }

  /* ------------------------------------------------------------- popovers */

  _buildPopovers() {
    this.forePop = this._palettePop(
      (c) => {
        this.foreBar.style.background = c;
        this.exec('foreColor', c);
      },
      () => this.exec('foreColor', 'inherit'),
      'Remove colour'
    );

    this.backPop = this._palettePop(
      (c) => {
        this.backBar.style.background = c;
        this.exec('hiliteColor', c);
      },
      () => this.exec('hiliteColor', 'transparent'),
      'Remove highlight'
    );

    this.tablePop = this._tablePop();
    this.popsEl.append(this.forePop, this.backPop, this.tablePop);

    const onDown = (e) => {
      if (
        !e.target.closest('.re-pop') &&
        !e.target.closest('.re-swatch') &&
        !e.target.closest('[data-pop-anchor]')
      )
        this._closePops();
    };
    document.addEventListener('mousedown', onDown);
    this._destroyers.push(() =>
      document.removeEventListener('mousedown', onDown)
    );
  }

  _palettePop(apply, clear, clearLabel) {
    const pop = h('div', 're-pop');
    const grid = h('div', 're-palette');
    SWATCHES.forEach((c) => {
      const b = h('button', '');
      b.type = 'button';
      b.style.background = c;
      b.title = c;
      b.addEventListener('mousedown', (e) => e.preventDefault());
      b.addEventListener('click', () => {
        apply(c);
        this._closePops();
      });
      grid.append(b);
    });
    const foot = h('div', 're-pop-foot');
    const custom = h('input', '');
    custom.type = 'color';
    custom.value = '#1f5d4c';
    custom.addEventListener('input', () => apply(custom.value));
    const clearBtn = h('button', 're-linkish');
    clearBtn.type = 'button';
    clearBtn.textContent = clearLabel;
    clearBtn.addEventListener('mousedown', (e) => e.preventDefault());
    clearBtn.addEventListener('click', () => {
      clear();
      this._closePops();
    });
    foot.append(custom, clearBtn);
    pop.append(grid, foot);
    return pop;
  }

  _tablePop() {
    const pop = h('div', 're-pop');
    const grid = h('div', 're-grid');
    for (let r = 1; r <= 8; r++) {
      for (let c = 1; c <= 8; c++) {
        const cell = h('i', '');
        cell.dataset.r = r;
        cell.dataset.c = c;
        grid.append(cell);
      }
    }
    const label = h('div', 're-grid-label');
    label.textContent = 'Pick a size';
    grid.addEventListener('mouseover', (e) => {
      if (e.target.tagName !== 'I') return;
      const rr = +e.target.dataset.r;
      const cc = +e.target.dataset.c;
      [...grid.children].forEach((cell) => {
        cell.classList.toggle(
          'lit',
          +cell.dataset.r <= rr && +cell.dataset.c <= cc
        );
      });
      label.textContent = `${cc} × ${rr}`;
    });
    grid.addEventListener('click', (e) => {
      if (e.target.tagName !== 'I') return;
      this.insertTable(+e.target.dataset.r, +e.target.dataset.c);
      this._closePops();
    });
    pop.append(grid, label);
    return pop;
  }

  _openPop(pop, anchor) {
    this._closePops();
    this._saveRange();
    pop.classList.add('open');
    const a = anchor.getBoundingClientRect();
    const host = this.el.getBoundingClientRect();
    const left = Math.min(a.left - host.left, host.width - pop.offsetWidth - 8);
    pop.style.left = `${Math.max(4, left)}px`;
    pop.style.top = `${a.bottom - host.top + 4}px`;
  }

  _closePops() {
    this.popsEl
      .querySelectorAll('.re-pop.open')
      .forEach((p) => p.classList.remove('open'));
  }

  /* -------------------------------------------------------------- dialogs */

  _buildDialogs() {
    this.linkDlg = h('dialog', 're-dialog');
    this.linkDlg.innerHTML = `
      <h2>Insert link</h2>
      <div class="re-dbody">
        <label class="re-field"><span>Text to display</span><input type="text" data-f="text" placeholder="Read the docs"></label>
        <label class="re-field"><span>Address</span><input type="url" data-f="url" placeholder="https://example.com"></label>
        <label class="re-check"><input type="checkbox" data-f="blank" checked> Open in a new tab</label>
      </div>
      <div class="re-dfoot">
        <button type="button" class="re-b" data-a="cancel">Cancel</button>
        <button type="button" class="re-b primary" data-a="save">Insert link</button>
      </div>`;
    this.linkDlg
      .querySelector('[data-a="cancel"]')
      .addEventListener('click', () => this.linkDlg.close());
    this.linkDlg
      .querySelector('[data-a="save"]')
      .addEventListener('click', () => this._saveLink());
    this.el.append(this.linkDlg);
  }

  openLinkDialog() {
    if (this.disabled || this.readOnly) return;
    this._saveRange();
    const sel = window.getSelection();
    const anchor = this._closestTag('A');
    const f = (n) => this.linkDlg.querySelector(`[data-f="${n}"]`);
    f('text').value = anchor ? anchor.textContent : String(sel || '');
    f('url').value = anchor ? anchor.getAttribute('href') : '';
    f('blank').checked = anchor ? anchor.target === '_blank' : true;
    this.linkDlg.showModal();
    f('url').focus();
  }

  _saveLink() {
    const f = (n) => this.linkDlg.querySelector(`[data-f="${n}"]`);
    const url = f('url').value.trim();
    if (!url) return;
    const text = f('text').value.trim() || url;
    const blank = f('blank').checked;
    this.linkDlg.close();
    const rel = blank ? ' target="_blank" rel="noopener noreferrer"' : '';
    this.exec(
      'insertHTML',
      `<a href="${escAttr(url)}"${rel}>${escHtml(text)}</a>`
    );
  }

  /* ----------------------------------------------------------- uploadcare */

  _wireUploadcare() {
    const cfg = { ...this.opts.uploadcare };
    if (!cfg.pubkey)
      console.warn(
        'RichEditor: uploadcare.pubkey is missing — uploads will fail.'
      );

    const host = h('div', 're-uc');
    this.ucConfig = document.createElement('uc-config');
    this.ucConfig.setAttribute('ctx-name', this.ctxName);
    // Sensible defaults; anything in options.uploadcare overrides them.
    const attrs = {
      'source-list': 'local, url, camera, dropbox, gdrive',
      multiple: 'true',
      'confirm-upload': 'false',
      'use-cloud-image-editor': 'true',
      ...toAttrs(cfg),
    };
    Object.entries(attrs).forEach(([k, v]) => {
      if (v === false || v === null || v === undefined) return;
      this.ucConfig.setAttribute(k, v === true ? 'true' : String(v));
    });

    this.ucUploader = document.createElement('uc-file-uploader-regular');
    this.ucUploader.setAttribute('ctx-name', this.ctxName);
    this.ucUploader.setAttribute('headless', ''); // hide the built-in button

    this.ucCtx = document.createElement('uc-upload-ctx-provider');
    this.ucCtx.setAttribute('ctx-name', this.ctxName);

    host.append(this.ucConfig, this.ucUploader, this.ucCtx);
    this.el.append(host);

    // With `multiple: true` the dialog stays open after each successful
    // upload so more files can be added — it does not close automatically.
    // Trying to focus the editor and insert while that dialog is still open
    // races its focus trap: the focus() call either loses to the trap
    // (nothing gets inserted) or fights it (visible flicker/"refresh").
    // So uploads are queued here and only inserted once the dialog has
    // actually closed and focus is back on the page.
    this._pendingUploads = [];
    this._onUploadSuccess = (e) => {
      if (e.detail) this._pendingUploads.push(e.detail);
    };
    this._onModalClose = () => {
      const uploads = this._pendingUploads;
      this._pendingUploads = [];
      if (!uploads.length) return;
      // One tick so the dialog's teardown (and whatever it does with focus
      // on close) has actually finished before we try to focus the editor.
      setTimeout(() => {
        uploads.forEach((entry) => {
          try {
            this._insertUploaded(entry);
          } catch (err) {
            console.error('RichEditor: could not insert an uploaded file', err);
          }
        });
      }, 0);
      // Drop the collection so the next open starts clean.
      try {
        this.ucCtx.getAPI().removeAllFiles();
      } catch (_) {
        /* not ready yet */
      }
    };
    this._onUploadFailed = (e) => {
      const msg = e.detail?.errors?.[0]?.message || 'Upload failed';
      console.error('RichEditor upload failed:', msg, e.detail);
    };

    this.ucCtx.addEventListener('file-upload-success', this._onUploadSuccess);
    this.ucCtx.addEventListener('file-upload-failed', this._onUploadFailed);
    this.ucCtx.addEventListener('modal-close', this._onModalClose);

    this._destroyers.push(() => {
      this.ucCtx.removeEventListener(
        'file-upload-success',
        this._onUploadSuccess
      );
      this.ucCtx.removeEventListener(
        'file-upload-failed',
        this._onUploadFailed
      );
      this.ucCtx.removeEventListener('modal-close', this._onModalClose);
    });
  }

  /** Opens the Uploadcare dialog. Caret position is restored before insert.
   *  If the editor was never focused/selected first, falls back to inserting
   *  at the end of the document rather than silently going nowhere. */
  pickFiles({ imagesOnly = false } = {}) {
    if (!this.ucCtx || this.disabled || this.readOnly) return;
    this.contentEl.focus();
    this._ensureRange();
    this.ucConfig.setAttribute('img-only', imagesOnly ? 'true' : 'false');
    if (imagesOnly) this.ucConfig.setAttribute('accept', 'image/*');
    else this.ucConfig.removeAttribute('accept'); // an empty string means "allow nothing", not "allow anything"
    try {
      this.ucCtx.getAPI().initFlow();
    } catch (err) {
      console.error(
        'RichEditor: Uploadcare components are not registered. ' +
          'Call UC.defineComponents(UC) once before mounting the editor — see the note ' +
          'below if @uploadcare/react-uploader is also used elsewhere in this app.',
        err
      );
    }
  }

  _insertUploaded(entry) {
    if (!entry?.cdnUrl) return;
    const html = entry.isImage ? this._imageHtml(entry) : this._fileHtml(entry);
    this.contentEl.focus();
    this._restoreRange();
    document.execCommand('insertHTML', false, html + '<p><br></p>');
    this._saveRange();
    this._emitChange();
    if (this.opts.onUpload) this.opts.onUpload(entry);
  }

  _imageHtml(entry) {
    // -/preview/ keeps huge originals from being embedded at full size.
    const src = `${entry.cdnUrl.replace(/\/$/, '')}/-/preview/1600x1600/`;
    return (
      `<img src="${escAttr(src)}" alt="${escAttr(entry.name || '')}" ` +
      `data-uuid="${escAttr(entry.uuid || '')}">`
    );
  }

  _fileHtml(entry) {
    return (
      `<p><a class="re-file" href="${escAttr(entry.cdnUrl)}" ` +
      `target="_blank" rel="noopener noreferrer" data-uuid="${escAttr(entry.uuid || '')}">` +
      `${escHtml(entry.name || 'Attachment')}<span>${formatBytes(entry.size)}</span></a></p>`
    );
  }

  /* ------------------------------------------------------------- commands */

  exec(command, value = null) {
    if (this.disabled || this.readOnly) return;
    this.contentEl.focus();
    this._ensureRange();
    try {
      document.execCommand(command, false, value);
    } catch (_) {
      /* noop */
    }
    this._normalise();
    this._emitChange();
    this._refresh();
  }

  setFontSize(px) {
    this._applyInlineStyle('fontSize', px);
  }

  setFontFamily(stack) {
    this._applyInlineStyle('fontFamily', stack);
  }

  /**
   * Wraps the current selection in a <span> carrying one inline style.
   * Used for font size and font family instead of execCommand('fontSize'/
   * 'fontName'), which is unreliable when reapplied to text that already
   * carries an inline style — a known limitation of that legacy API.
   *
   * Unlike execCommand toggles (bold, italic), a custom command like this
   * gets no free "applies to what I type next" behavior when nothing is
   * selected, so that's handled explicitly below: a collapsed caret inside
   * a word restyles that word; a caret with no word nearby primes a styled
   * insertion point for subsequent typing.
   */
  _applyInlineStyle(prop, value) {
    if (this.disabled || this.readOnly) return;
    this.contentEl.focus();
    this._restoreRange();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      console.warn(
        'RichEditor: click into the text first to change its font or size.'
      );
      return;
    }
    let range = sel.getRangeAt(0);
    if (!this.contentEl.contains(range.commonAncestorContainer)) {
      console.warn(
        'RichEditor: click into the text first to change its font or size.'
      );
      return;
    }

    if (range.collapsed) {
      const wordRange = wordRangeAt(range);
      if (wordRange) {
        range = wordRange;
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        this._primeTypingStyle(prop, value, range);
        return;
      }
    }

    const span = document.createElement('span');
    span.style[prop] = value;
    try {
      range.surroundContents(span);
    } catch (_) {
      // Selection crosses element boundaries (e.g. spans two paragraphs) —
      // surroundContents can't handle that, so extract and rewrap instead.
      const frag = range.extractContents();
      span.appendChild(frag);
      range.insertNode(span);
    }

    // Reselect the wrapped text so the next size/font change applies cleanly,
    // without depending on a stale range surviving the DOM mutation above.
    const after = document.createRange();
    after.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(after);
    this.savedRange = after.cloneRange();

    this._emitChange();
    this._refresh();
  }

  /** No word under the caret to restyle (empty line, start/end of a block) —
   *  insert an empty styled span and park the caret inside it, so the next
   *  characters typed land inside it and inherit the style via CSS. */
  _primeTypingStyle(prop, value, range) {
    const span = document.createElement('span');
    span.style[prop] = value;
    span.appendChild(document.createTextNode('\u200B')); // zero-width space, keeps the span non-empty so the caret can sit inside it
    range.insertNode(span);

    const after = document.createRange();
    after.setStart(span.firstChild, 1);
    after.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(after);
    this.savedRange = after.cloneRange();

    this._emitChange();
    this._refresh();
  }

  insertTable(rows, cols) {
    let html = '<table><thead><tr>';
    for (let c = 0; c < cols; c++) html += `<th>Column ${c + 1}</th>`;
    html += '</tr></thead><tbody>';
    for (let r = 1; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) html += '<td><br></td>';
      html += '</tr>';
    }
    html += '</tbody></table><p><br></p>';
    this.exec('insertHTML', html);
  }

  /** execCommand emits <font size="1-7">; rewrite those as real CSS spans. */
  _normalise() {
    this.contentEl.querySelectorAll('font').forEach((f) => {
      const span = document.createElement('span');
      if (f.dataset.px) span.style.fontSize = f.dataset.px;
      if (f.getAttribute('color')) span.style.color = f.getAttribute('color');
      if (f.getAttribute('face'))
        span.style.fontFamily = f.getAttribute('face');
      while (f.firstChild) span.append(f.firstChild);
      f.replaceWith(span);
    });
  }

  /* ---------------------------------------------------------------- wiring */

  _wireEditor() {
    try {
      document.execCommand('styleWithCSS', false, true);
    } catch (_) {
      /* noop */
    }
    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch (_) {
      /* noop */
    }

    const onInput = () => {
      this._normalise();
      this._emitChange();
      this._count();
    };
    const onSelect = () => {
      if (this.el.contains(document.activeElement)) {
        this._saveRange();
        this._refresh();
      }
    };

    this.contentEl.addEventListener('input', onInput);
    this.contentEl.addEventListener('mouseup', () => this._refresh());
    this.contentEl.addEventListener('keyup', () => this._refresh());
    this.contentEl.addEventListener('focus', () => this._refresh());
    this.contentEl.addEventListener('paste', (e) => this._onPaste(e));
    this.contentEl.addEventListener('drop', (e) => this._onDrop(e));
    this.contentEl.addEventListener('keydown', (e) => this._onKeydown(e));
    this.sourceEl.addEventListener('input', () =>
      this._emitChange(this.sourceEl.value)
    );
    document.addEventListener('selectionchange', onSelect);
    this._destroyers.push(() =>
      document.removeEventListener('selectionchange', onSelect)
    );
  }

  _onKeydown(e) {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.openLinkDialog();
      return;
    }
    if (e.key === 'Tab' && !this.disabled && !this.readOnly) {
      e.preventDefault();
      this.exec(e.shiftKey ? 'outdent' : 'indent');
    }
  }

  _onPaste(e) {
    if (this.disabled || this.readOnly) {
      e.preventDefault();
      return;
    }
    const html = e.clipboardData?.getData('text/html');
    const files = [...(e.clipboardData?.files || [])];
    if (files.length && this.ucCtx) {
      e.preventDefault();
      this._uploadRawFiles(files);
      return;
    }
    if (!html) return;
    e.preventDefault();
    document.execCommand('insertHTML', false, sanitise(html));
    this._emitChange();
  }

  _onDrop(e) {
    if (this.disabled || this.readOnly) {
      e.preventDefault();
      return;
    }
    const files = [...(e.dataTransfer?.files || [])];
    if (!files.length || !this.ucCtx) return;
    e.preventDefault();
    this._saveRange();
    this._uploadRawFiles(files);
  }

  /** Pushes dropped/pasted File objects straight into the Uploadcare collection. */
  _uploadRawFiles(files) {
    try {
      const api = this.ucCtx.getAPI();
      files.forEach((file) => api.addFileFromObject(file, { silent: false }));
    } catch (err) {
      console.error('RichEditor: could not hand files to Uploadcare', err);
    }
  }

  /* ----------------------------------------------------------------- state */

  _refresh() {
    this.buttons.forEach((btn) => {
      const cmd = btn.dataset.state;
      if (!cmd || !STATEFUL.includes(cmd)) return;
      let on = false;
      try {
        on = document.queryCommandState(cmd);
      } catch (_) {
        /* noop */
      }
      btn.classList.toggle('on', !!on);
    });
    if (this.blockSel) {
      let block = 'p';
      try {
        const v = (
          document.queryCommandValue('formatBlock') || ''
        ).toLowerCase();
        if (v) block = v === 'div' ? 'p' : v;
      } catch (_) {
        /* noop */
      }
      const idx = [...this.blockSel.options].findIndex(
        (o) => o.value === block
      );
      if (idx >= 0) this.blockSel.selectedIndex = idx;
    }
    if (this.sizeSel) this._syncStyleSelect(this.sizeSel, 'fontSize');
    if (this.fontSel) this._syncStyleSelect(this.fontSel, 'fontFamily');
    this._count();
    this._crumbs();
  }

  /** Points a font/size <select> at the option matching the nearest ancestor
   *  element that explicitly sets that CSS property, or its placeholder if
   *  nothing in the selection sets it. */
  _syncStyleSelect(select, prop) {
    const val = this._nearestInlineStyle(prop);
    const norm = (s) =>
      String(s || '')
        .replace(/["']/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    const target = norm(val);
    const idx = target
      ? [...select.options].findIndex(
          (o) => o.value && norm(o.value) === target
        )
      : -1;
    select.selectedIndex = idx >= 0 ? idx : 0;
  }

  _nearestInlineStyle(prop) {
    const sel = window.getSelection();
    if (!sel?.anchorNode || !this.contentEl.contains(sel.anchorNode)) return '';
    let node =
      sel.anchorNode.nodeType === 3
        ? sel.anchorNode.parentNode
        : sel.anchorNode;
    while (node && node !== this.contentEl) {
      if (node.style && node.style[prop]) return node.style[prop];
      node = node.parentNode;
    }
    return '';
  }

  _count() {
    if (!this.countEl) return;
    const text = (this.contentEl.innerText || '').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').length : 0;
    this.countEl.textContent = `${words} ${words === 1 ? 'word' : 'words'} · ${text.length} characters`;
  }

  _crumbs() {
    if (!this.crumbsEl) return;
    const sel = window.getSelection();
    if (!sel?.anchorNode || !this.contentEl.contains(sel.anchorNode)) return;
    let node =
      sel.anchorNode.nodeType === 3
        ? sel.anchorNode.parentNode
        : sel.anchorNode;
    const path = [];
    while (node && node !== this.contentEl) {
      path.unshift(node.tagName.toLowerCase());
      node = node.parentNode;
    }
    this.crumbsEl.textContent = ['body', ...path].join(' › ');
  }

  _saveRange() {
    const sel = window.getSelection();
    if (sel?.rangeCount && this.contentEl.contains(sel.anchorNode)) {
      this.savedRange = sel.getRangeAt(0).cloneRange();
    }
  }

  /**
   * Guarantees `this.savedRange` is usable before an insertion-style action
   * (a toolbar command, opening the upload dialog). If nothing was ever
   * selected or focused in the editor — the most common cause of a toolbar
   * button silently doing nothing — this falls back to a collapsed range at
   * the end of the content, the same place a real editor would insert.
   */
  _ensureRange() {
    // Prefer whatever is already cached — continuously tracked via
    // selectionchange, or captured pre-emptively before a <select> stole
    // focus and collapsed the live selection. Only fall back to a fresh live
    // read, then to the end of the content, if nothing usable is on hand;
    // re-reading unconditionally would overwrite a good cached range with
    // the now-collapsed live one.
    let usable =
      this.savedRange &&
      this.contentEl.contains(this.savedRange.startContainer);
    if (!usable) {
      this._saveRange();
      usable =
        this.savedRange &&
        this.contentEl.contains(this.savedRange.startContainer);
    }
    if (!usable) {
      const range = document.createRange();
      range.selectNodeContents(this.contentEl);
      range.collapse(false);
      this.savedRange = range;
    }
    this._restoreRange();
    return this.savedRange;
  }

  _restoreRange() {
    if (!this.savedRange) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(this.savedRange);
  }

  _closestTag(tag) {
    const sel = window.getSelection();
    if (!sel?.anchorNode) return null;
    let n =
      sel.anchorNode.nodeType === 3
        ? sel.anchorNode.parentNode
        : sel.anchorNode;
    while (n && n !== this.contentEl) {
      if (n.tagName === tag) return n;
      n = n.parentNode;
    }
    return null;
  }

  _emitChange(html = null) {
    this._lastHTML = html ?? this.contentEl.innerHTML;
    if (this.opts.onChange) this.opts.onChange(this._lastHTML);
  }

  /* --------------------------------------------------------------- public */

  get disabled() {
    return !!this.opts.disabled;
  }
  get readOnly() {
    return !!this.opts.readOnly;
  }

  /** Fully locked: not editable, not focusable, toolbar entirely disabled. */
  setDisabled(disabled) {
    this.opts.disabled = !!disabled;
    this._applyLockState();
  }

  /** Content not editable, but still focusable/selectable/copyable; view-only
   *  toolbar controls (source, fullscreen) stay usable. */
  setReadOnly(readOnly) {
    this.opts.readOnly = !!readOnly;
    this._applyLockState();
  }

  _applyLockState() {
    const { disabled, readOnly } = this.opts;
    const locked = disabled || readOnly;

    this.contentEl.contentEditable = locked ? 'false' : 'true';
    this.contentEl.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    this.contentEl.setAttribute('aria-readonly', readOnly ? 'true' : 'false');
    // contenteditable="true" is implicitly focusable; once it's false that
    // goes away, so restore it by hand for read-only (still selectable/
    // copyable) while explicitly excluding disabled from the tab order.
    if (disabled) this.contentEl.setAttribute('tabindex', '-1');
    else if (readOnly) this.contentEl.setAttribute('tabindex', '0');
    else this.contentEl.removeAttribute('tabindex');

    this.el.classList.toggle('re-disabled', !!disabled);
    this.el.classList.toggle('re-readonly', !disabled && !!readOnly);
    this.sourceEl.readOnly = locked;

    // Source/fullscreen only ever view content, never change it, so they stay
    // usable in read-only mode; a full `disabled` turns off everything.
    const alwaysEnabled = new Set([this.srcBtn, this.fsBtn].filter(Boolean));
    this.toolbarEl.querySelectorAll('button, select').forEach((el) => {
      const exempt = readOnly && !disabled && alwaysEnabled.has(el);
      el.disabled = locked && !exempt;
    });

    if (locked) this._closePops();
  }

  getHTML() {
    return this.el.classList.contains('re-source-mode')
      ? this.sourceEl.value
      : this.contentEl.innerHTML;
  }

  getText() {
    return this.contentEl.innerText;
  }

  setHTML(html) {
    this.contentEl.innerHTML = html || '';
    this._lastHTML = this.contentEl.innerHTML;
    this._count();
  }

  focus() {
    this.contentEl.focus();
  }

  toggleSource(force) {
    if (this.disabled) return;
    const on = force ?? !this.el.classList.contains('re-source-mode');
    if (on) {
      this.sourceEl.value = prettyHtml(this.contentEl.innerHTML);
    } else if (!this.readOnly) {
      // Read-only source view is look-but-don't-touch: switching back to the
      // rich view discards any edits typed into the textarea rather than
      // applying them, since the textarea's own readOnly flag only stops
      // typing — it doesn't stop us from reading its value back in.
      this.contentEl.innerHTML = this.sourceEl.value;
      this._emitChange();
    }
    this.el.classList.toggle('re-source-mode', on);
    this.srcBtn?.classList.toggle('on', on);
    (on ? this.sourceEl : this.contentEl).focus();
  }

  toggleFullscreen(force) {
    if (this.disabled) return;
    const on = force ?? !this.el.classList.contains('re-fullscreen');
    this.el.classList.toggle('re-fullscreen', on);
    this.fsBtn?.classList.toggle('on', on);
    document.body.style.overflow = on ? 'hidden' : '';
  }

  destroy() {
    this._destroyers.forEach((fn) => fn());
    this._destroyers = [];
    document.body.style.overflow = '';
    this.el.innerHTML = '';
    this.el.classList.remove('re', 're-fullscreen', 're-source-mode');
  }
}

/* -------------------------------------------------------------- helpers */

/** TinyMCE / CKEditor button names accepted as aliases, so an existing
 *  toolbar config can be pasted in unchanged. */
const ALIASES = {
  blocks: 'block',
  formatselect: 'block',
  styles: 'block',
  heading: 'block',
  fontfamily: 'font',
  fontselect: 'font',
  fontname: 'font',
  fontsize: 'size',
  fontsizeselect: 'size',
  fontsizes: 'size',
  strikethrough: 'strike',
  forecolor: 'fore',
  textcolor: 'fore',
  fontcolor: 'fore',
  backcolor: 'back',
  hilitecolor: 'back',
  highlight: 'back',
  alignleft: 'alignLeft',
  aligncenter: 'alignCenter',
  alignright: 'alignRight',
  alignjustify: 'alignJustify',
  justify: 'alignJustify',
  bullist: 'bullets',
  bulletedlist: 'bullets',
  ul: 'bullets',
  numlist: 'numbers',
  numberedlist: 'numbers',
  ol: 'numbers',
  removeformat: 'clear',
  hr: 'hr',
  horizontalrule: 'hr',
  media: 'attach',
  file: 'attach',
  upload: 'attach',
  uploadcare: 'attach',
  superscript: 'sup',
  subscript: 'sub',
};

const KNOWN = new Set([
  'undo',
  'redo',
  'block',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'sup',
  'sub',
  'fore',
  'back',
  'alignLeft',
  'alignCenter',
  'alignRight',
  'alignJustify',
  'bullets',
  'numbers',
  'outdent',
  'indent',
  'link',
  'unlink',
  'image',
  'attach',
  'table',
  'hr',
  'clear',
]);

/**
 * Accepts any of:
 *   [['bold','italic'], ['link']]           groups (canonical)
 *   ['bold','italic','|','link']            flat, '|' separates groups
 *   'bold italic | link image'              TinyMCE-style string
 *   undefined / null / ''                   falls back to the default toolbar
 */
function normaliseToolbar(input) {
  if (input === false) return [];
  if (!input) return DEFAULT_TOOLBAR;

  let flat;
  if (typeof input === 'string') {
    flat = input.split(/[\s,]+/).filter(Boolean);
  } else if (
    Array.isArray(input) &&
    input.every((x) => typeof x === 'string')
  ) {
    flat = input.flatMap((x) => x.split(/[\s,]+/)).filter(Boolean);
  } else if (Array.isArray(input)) {
    return input
      .map((group) =>
        (Array.isArray(group) ? group : [group]).map(canonical).filter(Boolean)
      )
      .filter((group) => group.length);
  } else {
    console.warn(
      'RichEditor: unrecognised `toolbar` option, using the default.'
    );
    return DEFAULT_TOOLBAR;
  }

  const groups = [[]];
  flat.forEach((raw) => {
    if (raw === '|' || raw === '-') {
      groups.push([]);
      return;
    }
    const name = canonical(raw);
    if (name) groups[groups.length - 1].push(name);
  });
  const cleaned = groups.filter((g) => g.length);
  return cleaned.length ? cleaned : DEFAULT_TOOLBAR;
}

function canonical(raw) {
  if (typeof raw !== 'string') return null;
  const name = raw.trim();
  if (KNOWN.has(name)) return name;
  const alias = ALIASES[name.toLowerCase()];
  if (alias) return alias;
  const exact = [...KNOWN].find((k) => k.toLowerCase() === name.toLowerCase());
  if (exact) return exact;
  console.warn(`RichEditor: unknown toolbar item "${raw}" — skipped.`);
  return null;
}

/** Expands a collapsed range to the word touching the caret, walking only
 *  within the current text node (good enough for the common "clicked mid
 *  word" case; returns null for an empty line or a non-text anchor, where
 *  there's no word to expand into). */
function wordRangeAt(range) {
  const node = range.startContainer;
  if (node.nodeType !== 3) return null;
  const text = node.textContent;
  const isWordChar = (ch) => !!ch && !/\s/.test(ch);
  let start = range.startOffset;
  let end = range.startOffset;
  while (start > 0 && isWordChar(text[start - 1])) start--;
  while (end < text.length && isWordChar(text[end])) end++;
  if (start === end) return null;
  const r = document.createRange();
  r.setStart(node, start);
  r.setEnd(node, end);
  return r;
}

function h(tag, cls) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  return el;
}

function svg(path) {
  const subpaths = path
    .split('M')
    .filter(Boolean)
    .map((d) => `<path d="M${d}"/>`)
    .join('');
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${subpaths}</svg>`;
}

function escHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]
  );
}

function escAttr(s) {
  return escHtml(s).replace(/'/g, '&#39;');
}

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i ? 1 : 0)} ${units[i]}`;
}

/** camelCase options -> kebab-case <uc-config> attributes. */
function toAttrs(obj) {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (Array.isArray(v)) v = v.join(', ');
    out[k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)] = v;
  });
  return out;
}

/** Strips Word/Docs noise from pasted HTML, keeping the formatting that matters. */
function sanitise(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.body
    .querySelectorAll('script,style,meta,link,iframe,object,embed')
    .forEach((n) => n.remove());
  const KEEP_ATTR = ['href', 'src', 'alt', 'colspan', 'rowspan'];
  const KEEP_CSS = [
    'color',
    'background-color',
    'font-weight',
    'font-style',
    'text-decoration',
    'text-align',
    'font-size',
  ];
  doc.body.querySelectorAll('*').forEach((el) => {
    [...el.attributes].forEach((attr) => {
      if (KEEP_ATTR.includes(attr.name)) return;
      if (attr.name === 'style') {
        const decl = KEEP_CSS.map((p) => [p, el.style.getPropertyValue(p)])
          .filter(([, v]) => v)
          .map(([p, v]) => `${p}:${v}`);
        if (decl.length) el.setAttribute('style', decl.join(';'));
        else el.removeAttribute('style');
        return;
      }
      el.removeAttribute(attr.name);
    });
  });
  return doc.body.innerHTML;
}

function prettyHtml(html) {
  const lines = html
    .replace(/></g, '>\n<')
    .replace(/\n<\/(b|i|u|em|strong|a|span|code|mark|sub|sup)>/g, '</$1>')
    .split('\n');
  let depth = 0;
  return lines
    .map((line) => {
      if (/^<\//.test(line)) depth = Math.max(0, depth - 1);
      const pad = '  '.repeat(depth);
      if (/^<[^/!][^>]*[^/]>$/.test(line) && !/^<(br|hr|img|input)/i.test(line))
        depth++;
      return pad + line;
    })
    .join('\n');
}

export default RichEditor;
