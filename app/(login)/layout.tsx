import { Updater } from '@/state/updater';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Updater />
      {children}
    </>
  );
}
