// tools.js
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import SelectedInlineTool from './customTools';

export class MarkerTool {
  static get isInline() {
    return true;
  }

  constructor() {
    this.button = null;
    this.state = false;
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.textContent = 'M';

    return this.button;
  }

  surround(range: Range) {
    if (this.state) {
      // If highlights is already applied, do nothing for now
      return;
    }
    const selectedText = range.extractContents();

    // Create MARK element
    const mark = document.createElement('MARK');

    // Append to the MARK element selected TextNode
    mark.appendChild(selectedText);

    // Insert new element
    range.insertNode(mark);
  }

  checkState(selection) {
    const text = selection.anchorNode;

    if (!text) {
      return;
    }

    const anchorElement = text instanceof Element ? text : text.parentElement;

    this.state = !!anchorElement.closest('MARK');
  }
}

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  // embed: Embed,
  table: Table,
  // list: List,
  // warning: Warning,
  // code: Code,
  // linkTool: LinkTool,
  image: Image,
  // raw: Raw,
  // header: Header,
  // quote: Quote,
  marker: MarkerTool,
  // checklist: CheckList,
  // delimiter: Delimiter,
  // inlineCode: InlineCode,
  // simpleImage: SimpleImage,
  selectedInlineTool: SelectedInlineTool,
  // MarkerTool: MarkerTool,
};
