"use client"
import Dropdown from '@/components/Dropdown';

const menuItems = [
  {
    title: 'Menu 1',
    route: '/menu1',
    children: [
      { title: 'Submenu 1', route: '/submenu1' },
      { title: 'Submenu 2', route: '/submenu2' },
    ],
  },
  // Add more menu items as needed
];

const MenuItems: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Dropdown Example</h1>
      {menuItems.map((item) => (
        <Dropdown key={item.route} item={item} />
      ))}
    </div>
  )
}

export default MenuItems
