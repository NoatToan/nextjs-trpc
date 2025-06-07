// create editor instance
import EditorJS from '@editorjs/editorjs';
import { useMemo, useState } from 'react';
import { EDITOR_JS_TOOLS } from './tools';

export default function Editor({
  suffix,
  data,
  setData,
}: {
  suffix: string | number;
  data: any;
  setData: (data: any) => void;
}) {
  const holderId = `editorjs${suffix}`;

  // const editor = new EditorJS({
  //   /**
  //    * Id of Element that should contain the Editor
  //    */
  //   holder: 'editorjs',

  //   /**
  //    * Available Tools list.
  //    * Pass Tool's class or Settings object for each Tool you want to use
  //    */
  //   tools: EDITOR_JS_TOOLS,
  //   data: data,
  // });
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
      data: data,
      inlineToolbar: true,
      minHeight: 200,
      hideToolbar: true,
    });
  }, []);

  const onClickHandler = () => {
    editor
      .save()
      .then(outputData => {
        console.log('Saved data: ', outputData);
        setData(outputData);
      })
      .catch(error => {
        console.log('Saving failed: ', error);
      });
  };

  return (
    <div className={'flex flex-col gap-1 w-full'}>
      <div>
        <p className="text-xs">{holderId}</p>
        <div className="flex flex-row gap-1">
          <button onClick={onClickHandler}>Save</button>
          <button
            onClick={() => {
              editor.readOnly.toggle();
            }}>
            Edit
          </button>
        </div>
      </div>

      <div id={holderId} className="text-[.75rem]!"></div>
    </div>
  );
}
