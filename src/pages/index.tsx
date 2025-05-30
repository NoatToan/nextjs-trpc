import { Accordion, AccordionItem } from '@heroui/react';
import { IcArrowDownSvg } from '@src/modules/assets';
import { trpc } from '@src/modules/utils/trpc';

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'client' });

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <IcArrowDownSvg /> */}
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {'defaultContent'}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {'defaultContent'}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {'defaultContent'}
        </AccordionItem>
      </Accordion>
      <p>{hello.data.post}</p>
    </div>
  );
}
