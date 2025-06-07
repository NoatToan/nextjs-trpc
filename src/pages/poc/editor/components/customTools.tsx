import { InlineTool } from '@editorjs/editorjs';
import { MenuConfig } from '@editorjs/editorjs/types/tools';

export default class SelectedInlineTool implements InlineTool {
  state: boolean;

  constructor() {
    this.state = false;
  }
  shortcut?: string | undefined;
  async surround?(range: Range | null): Promise<void> {
    if (this.state) {
      // If highlights is already applied, do nothing for now
      return;
    }

    console.log('range', range.cloneContents().textContent);
    setTimeout(async () => {
      const updateContent = await new Promise(resolve => resolve('UPDATE TEXT FROM API'));
      range?.deleteContents();

      range?.insertNode(document.createTextNode(updateContent as string));
    }, 500);
  }
  checkState?(selection: Selection): boolean {
    return false;
  }
  renderActions?(): HTMLElement {
    const input = document.createElement('input');

    return input;
  }
  render(): HTMLElement | MenuConfig | Promise<HTMLElement | MenuConfig> {
    return {
      icon: '<p>1</p>',
      onActivate: () => {
        this.surround(document.getSelection()?.getRangeAt(0) || null);
      },
    };
  }

  public static isInline = true;
  public static closeOnActivate: true;
  public static title: string = 'Action 1';
}
