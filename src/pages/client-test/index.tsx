import { Accordion, AccordionItem } from '@heroui/react';
import { trpc } from '@module/utils/trpc';
import { Fragment } from 'react';

export default function IndexPage() {
  const hello = trpc.cmsPost.useQuery({ text: 'client' });

  return (
    <Fragment>
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          subtitle="Press to expand"
          title="Accordion 1">
          {'defaultContent'}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          subtitle={
            <span>
              Press to expand <strong>key 2</strong>
            </span>
          }
          title="Accordion 2">
          {'defaultContent'}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          subtitle="Press to expand"
          title="Accordion 3">
          {'defaultContent'}
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
}
