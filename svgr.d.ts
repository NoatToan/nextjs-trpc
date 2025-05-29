declare module '*.svg?url' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: { src: string } & any;
  export default content;
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
