declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string;
      DATABASE_URI: string;
      NEXT_PUBLIC_SERVER_URL: string;
      VERCEL_PROJECT_PRODUCTION_URL: string;
    }
  }
}

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



// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};



