import { Fragment, useCallback, useState } from 'react';
// https://codesandbox.io/p/sandbox/react-to-print-a4-nyf1t?file=%2Fexample%2Findex.css%3A1%2C1-44%2C1
import { Switch } from '@heroui/react';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('./components/editor'), { ssr: false });

const exampleData = {
  time: new Date().getMilliseconds(),
  blocks: [
    {
      id: 'IpKh1dMyC6',
      type: 'paragraph',
      data: {
        text: 'Now, it can be used to create any plugin for any task. Hope you enjoy. 😏',
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
const className =
  'flex border border-solid border-1 w-[calc(100%/2-1rem)] min-w-[calc(100%/2-0.125rem)] h-[calc(100%/2-1rem)] p-1';
export default function Page() {
  const [data, setData] = useState(exampleData);
  console.log('data', data);

  const renderPage = useCallback(
    (key: number | string) => {
      const pageKey = `page-${key}`;
      return (
        <div className="page">
          <div className="pageContent flex flex-row flex-1 flex-wrap gap-1 justify-between items-start">
            <div className={className}>
              <Editor
                key={data.time}
                data={data}
                setData={data => {
                  console.log('1', 1);
                  setData(data);
                }}
                suffix={pageKey + 1}
              />
            </div>
            <div className={className}>
              <Editor key={data.time} data={data} setData={setData} suffix={pageKey + 2} />
            </div>
            <div className={className}>
              <Editor key={data.time} data={data} setData={setData} suffix={pageKey + 3} />
            </div>
            <div className={className}>
              <Editor key={data.time} data={data} setData={setData} suffix={pageKey + 4} />
            </div>
          </div>
        </div>
      );
    },
    [data],
  );

  return (
    <Fragment>
      {/* Side bar */}
      <div className="flex-1 flex flex-row gap-1 justify-between">
        <div className="flex-1 bg-[gray] hidden lg:block">
          <p>Side bar</p>
          <div className="flex gap-4">
            <Switch defaultSelected size="sm">
              Small
            </Switch>
            <Switch defaultSelected size="md">
              Medium
            </Switch>
            <Switch defaultSelected size="lg">
              Large
            </Switch>
          </div>
        </div>
        <div className="flex-3 justify-between items-between">{renderPage(1)}</div>
      </div>
      {/* <ComponentToPrint
        // ref={el => (this.componentRef = el)}
        /> */}
    </Fragment>
  );
}
