import { Navbar } from '@/components/ui/organism/Navbar';
import { navbarMock } from '@/mocks/navigation';

export default function HomePage() {
  return (
    <>
      <Navbar {...navbarMock} />
      <main id="main-content" aria-label="Luma" className="min-h-[calc(100svh-70px)]" />
    </>
  );
}
