import { Deposit } from './components/Deposit';
import { Login } from './components/Login';
import { Pay } from './components/Pay';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="h-full">{children}</main>
      <Login />
      <Deposit />
      <Pay />
    </>
  );
}
