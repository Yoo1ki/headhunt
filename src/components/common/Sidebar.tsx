import { Navbar } from "./Navbar";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-neutral-800/80 rounded-xl my-4 fixed top-14 bottom-0 overflow-hidden">
      <Navbar />
    </aside>
  );
};
