// create editor instance
import EditorJS from '@editorjs/editorjs';
import { Button } from '@heroui/react';
import { useMemo, useState } from 'react';
import { EDITOR_JS_TOOLS } from './tools';

export default function Editor({ suffix, initData }: { suffix: string | number; initData: any }) {
  const holderId = `${suffix}`;

  const [UIReadOnly, setUIReadOnly] = useState(false);

  const editor = useMemo(() => {
    return new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: holderId,

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: EDITOR_JS_TOOLS,
      data: initData,
      inlineToolbar: true,
      minHeight: 50,
      hideToolbar: true,
    });
  }, []);

  const onClickHandler = () => {
    editor
      .save()
      .then(outputData => {
        console.log('Saved data: ', outputData);
        console.log('outputData', outputData);

        setTimeout(() => {
          editor.readOnly.toggle();
          setUIReadOnly(true);
        }, 500);
      })
      .catch(error => {
        console.log('Saving failed: ', error);
      });
  };

  return (
    <div className={'flex flex-col gap-1 w-full'}>
      <div>
        <div className="flex flex-row gap-1">
          <p className="text-xs">{holderId}</p>
          <Button
            className="min-w-[5rem] h-5"
            onPress={() => {
              editor.readOnly.toggle();

              if (UIReadOnly) {
                setUIReadOnly(!editor.readOnly.isEnabled);
              } else {
                onClickHandler();
              }
            }}>
            {UIReadOnly ? 'Edit' : 'Save'}
          </Button>
        </div>
      </div>

      <div id={holderId} className="text-[8px]! pb-0!"></div>
    </div>
  );
}
