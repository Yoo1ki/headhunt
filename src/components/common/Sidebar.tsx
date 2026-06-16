import { Navbar } from './Navbar';

export const Sidebar = () => {
  return (
    <aside className="fixed top-14 bottom-0 my-4 w-64 overflow-hidden rounded-xl bg-neutral-800/80">
      <Navbar />
    </aside>
  );
};
