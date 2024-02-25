// components/Dropdown.tsx
import React, { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  title: string;
  route: string;
  children: { title: string, route: string }[]
}

interface Props {
  item: MenuItem;
}

const Dropdown: React.FC<Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = item.children || [];

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const transClass = isOpen ? 'flex' : 'hidden';

  return (
    <>
      <div className="relative">
        <button className="hover:text-blue-400" onClick={toggle}>
          {item.title}
        </button>
        <div
          className={`absolute top-8 z-30 w-[250px] min-h-[300px] flex flex-col py-4 bg-gray-200 rounded-md ${transClass}`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.route}
              href={item.route || ''}
              onClick={toggle}
              className="hover:bg-gray-300 hover:text-gray-600 px-4 py-1"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
          onClick={toggle}
        ></div>
      )}
    </>
  );
};

export default Dropdown;
