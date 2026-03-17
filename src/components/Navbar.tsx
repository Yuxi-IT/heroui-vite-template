import { Link } from 'react-router-dom';
import { MenuList } from './MenuList';
import { navItems } from '../config/site';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">HeroUI3</Link>
        <div className="flex space-x-4">
          <div className="flex space-x-4 hidden sm:flex">
            {navItems.map((item) => (
              <Link to={item.url} className="hover:underline">
                {item.label}
              </Link>
            ))}
          </div>
          <MenuList/>
        </div>

      </div>
      
    </nav>
  );
}

export default Navbar;
