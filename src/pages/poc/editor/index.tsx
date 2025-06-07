import { createRef, Fragment, Ref, useCallback, useState } from 'react';
// https://codesandbox.io/p/sandbox/react-to-print-a4-nyf1t?file=%2Fexample%2Findex.css%3A1%2C1-44%2C1
import { Button, Input, ScrollShadow, Spacer, Switch } from '@heroui/react';
import dynamic from 'next/dynamic';
import { useReactToPrint } from 'react-to-print';
import { ContentNode } from 'react-to-print/lib/types/ContentNode';
import { start } from 'repl';
const Editor = dynamic(() => import('./components/editor'), { ssr: false });
const exampleData = {
  time: new Date().getMilliseconds(),
  blocks: [
    {
      id: 'IpKh1dMyC6',
      type: 'paragraph',
      data: {
        text: 'As technology advances, people are becoming increasingly dependent on smart devices to perform everyday tasks. While this convenience is undeniable, it also raises concerns about the gradual decline in certain cognitive skills. For instance, people often rely on navigation apps rather than using their own sense of direction. As a result, their ability to read maps or remember routes is diminishing. In the same way, the use of grammar-checking software can affect one’s attention to language structure. Although these tools are helpful, __________.',
      },
    },
    {
      id: 'HKw8iJSq4_',
      type: 'table',
      data: {
        withHeadings: false,
        stretched: false,
        content: [
          ['1', '2'],
          ['3', '4'],
        ],
      },
    },
  ],
};
const exampleData1 = {
  time: new Date().getMilliseconds(),
  blocks: [
    {
      id: 'IpKh1dMyC6',
      type: 'paragraph',
      data: {
        text: 'As technology advances, people are becoming increasingly dependent on smart devices to perform everyday tasks. While this convenience is undeniable, it also raises concerns about the gradual decline in certain cognitive skills. For instance, people often rely on navigation apps rather than using their own sense of direction. As a result, their ability to read maps or remember routes is diminishing. In the same way, the use of grammar-checking software can affect one’s attention to language structure. Although these tools are helpful, __________.',
      },
    },
    {
      id: 'IpKh1dMyC61',
      type: 'paragraph',
      data: {
        text: '1. They may lead users to overestimate their own writing abilities.',
      },
    },
    {
      id: 'IpKh1dMyC62',
      type: 'paragraph',
      data: {
        text: '2. They are designed to improve communication speed and accuracy.',
      },
    },
    {
      id: 'IpKh1dMyC63',
      type: 'paragraph',
      data: {
        text: '3. They are designed to improve communication speed and accuracy.',
      },
    },
    {
      id: 'IpKh1dMyC4',
      type: 'paragraph',
      data: {
        text: '4. They provide a foundation for developing digital creativity.',
      },
    },
  ],
};

const refComponentPrint = createRef<ContentNode | null>();

export default function Page() {
  const reactToPrintFn = useReactToPrint({
    contentRef: refComponentPrint,
    documentTitle: 'Test',
  });

  const [headerStart, setHeaderStart] = useState('Example Company Header');
  const [headerEnd, setHeaderEnd] = useState('End of header');
  const [footerStart, setFooterStart] = useState('Example Company copyright@2025');

  let pageNumber = 0;

  const renderPage = (key: number) => {
    const pageKey = `Page_${key}`;
    pageNumber++;

    // const data = QuestionTypeDefaultData[EEditorType.DEFAULT];
    const dataNew = key % 2 === 0 ? exampleData : exampleData1;

    return (
      <div className="page" key={pageKey}>
        {/* Header */}
        <div className="pageHeader flex justify-between items-center text-[8px] w-full w-[100%]">
          <div>{headerStart}</div>
          <div>{headerEnd}</div>
        </div>
        {/* <div className="h-1" /> */}
        <div
          className="pageContent flex flex-row flex-1 flex-wrap gap-1 items-start"
          style={{ flexFlow: 'column wrap' }}>
          {/* Body */}
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <div
                className={
                  'flex border border-solid border-[.5px] w-[calc(100%/2-1rem)] min-w-[calc(100%/2-0.125rem)] h-[calc(100%/2-2rem)] px-2'
                }>
                <Editor
                  key={dataNew.time}
                  initData={dataNew}
                  suffix={pageKey + '_Question_' + (index + 1)}
                />
              </div>
            );
          })}
        </div>

        {/* <div className="h-1" /> */}

        {/* Footer */}
        <div className="pageFooter flex flex-1 justify-between items-center text-[8px]">
          <div>{footerStart}</div>
          <div>Page {pageNumber}</div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {/* Side bar */}
      <div className="flex-1 flex flex-row justify-between">
        <div className="flex-1 bg-[gray] hidden lg:block">
          <p>Configuration</p>
          <div className="flex flex-col gap-4">
            <Input
              // label="Start Header"
              // placeholder="Enter start Header"
              value={headerStart}
              onValueChange={setHeaderStart}
            />
            <Input
              // label="End Header"
              // placeholder="Enter end Header"
              value={headerEnd}
              onValueChange={setHeaderEnd}
            />
            <Input
              // label="Start Footer"
              // placeholder="Enter start Footer"
              value={footerStart}
              onValueChange={setFooterStart}
            />
          </div>
        </div>
        <div className="flex-3 flex flex-col">
          <div className="flex-1 items-end justify-end flex bg-[aqua]">
            <Button onPress={() => reactToPrintFn()}>Print this out!</Button>
          </div>
          <ScrollShadow className="h-[100vh] overflow-scroll">
            <div className="flex flex-1 flex-col" ref={refComponentPrint as Ref<HTMLDivElement>}>
              <div className="flex-1 justify-between items-between">{renderPage(1)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(2)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(3)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(4)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(5)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(6)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(7)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(8)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(9)}</div>
              <div className="flex-1 justify-between items-between">{renderPage(10)}</div>
            </div>
          </ScrollShadow>
        </div>
      </div>
      {/* <ComponentToPrint
        // ref={el => (this.componentRef = el)}
        /> */}
    </Fragment>
  );
}
