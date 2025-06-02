import { Button } from '@heroui/react';
import router from 'next/router';

export default function App() {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return (
    <>
      <Button onClick={() => router.push('/team')}>Team Setup</Button>
      <Button onClick={() => router.push('/user')}>User Setup</Button>
    </>
  );
}
