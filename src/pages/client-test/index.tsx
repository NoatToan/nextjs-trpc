import { Accordion, AccordionItem } from '@heroui/react';
import { IcArrowDownSvg } from '@module/assets';
import { trpc } from '@module/utils/trpc';

export default function IndexPage() {
  const hello = trpc.cmsPost.useQuery({ text: 'client' });
  console.log('hello', hello.data);
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
    </div>
  );
}
