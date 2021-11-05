import Prism from 'prismjs';
import commonmark from 'commonmark';
import { LitElement, html, PropertyValues, TemplateResult, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, state } from 'lit/decorators.js';

type ALLOWED_THEMES = [
  'coy',
  'dark',
  'funky',
  'okaidia',
  'solarizedlight',
  'tomorrow',
  'twilight'
];

export class MarkdownRenderer extends LitElement {
  // Markdown file name to render
  @property()
  mdsrc: string = '';

  // Markdown raw string to render
  @property()
  markdown: string = '';

  // prismjs theme name
  @property()
  theme: ALLOWED_THEMES | undefined;

  // Enable safe render for commonmark
  @property()
  safe: boolean = true;

  @state()
  _styles = '';

  @state()
  _markdownRendered: TemplateResult | undefined;

  _reader = new commonmark.Parser();

  _writer = new commonmark.HtmlRenderer({ safe: this.safe });

  connectedCallback() {
    super.connectedCallback();
    const theme = this.getAttribute('theme');
    if (theme === null) {
      this.setAttribute('theme', 'default');
    }
  }

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);

    if (changedValues.has('mdsrc') && this.mdsrc) {
      this.fetchMd(this.mdsrc);
    }
    if (changedValues.has('markdown') && this.markdown) {
      this._markdownRendered = this.parseMarkdown(this.markdown);
    }
    Prism.highlightAllUnder(this.shadowRoot as any);
  }

  /**
   * @method fetchMd
   * @description method to fetch markdown from a url or path
   * @param {String} src markdown url
   */
  async fetchMd(src: string) {
    if (!src.includes('.md')) {
      return;
    }
    const resource = await fetch(src);
    this.markdown = await resource.text();
  }

  /**
   * @method parseMarkdown
   * @description parse markdown string to html content
   * @param {String} markdown string with markdown content
   * @return {Object} html template string
   */
  parseMarkdown(markdown: string) {
    return html`${unsafeHTML(
      this._writer.render(this._reader.parse(markdown))
    )}`;
  }

  render() {
    return html` ${this._styles} ${this._markdownRendered}`;
  }

  static styles = [
    css`
      :host {
        word-break: break-all;
      }
    `,
  ];
}
