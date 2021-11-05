# @scoped-elements/markdown-renderer

This is the [prismjs-markdown-element](https://www.npmjs.com/package/prism-markdown-element) library packaged using the scoped custom elements registries pattern using [@open-wc/scoped-elements](https://www.npmjs.com/package/@open-wc/scoped-elements).

## Installation

```bash
npm i @scoped-elements/markdown-renderer
```

## Usage

### As an sub element in your own custom element

```js
import { MarkdownRenderer } from '@scoped-elements/markdown-renderer';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

export class CustomElement extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'markdown-renderer': Checkbox
    };
  }

  render() {
    return html`
      <markdown-renderer markdown="# Hi!"></markdown-renderer>
    `;
  }
}
```

### As a globally defined custom element

```js
import { MarkdownRenderer } from '@scoped-elements/markdown-renderer';

customElements.define('markdown-renderer', MarkdownRenderer);

```

## Documentation for the elements

As this package is just a re-export, you can find the documentation for the elements in each of their npm pages, e.g.: https://www.npmjs.com/package/prism-markdown-element.

Custom theming is not supported yet.