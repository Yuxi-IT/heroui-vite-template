import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../config/site';

interface BottomNavProps {
  defaultActive?: string;
  onItemClick?: (id: string) => void;
}

export function BottomNav({ defaultActive, onItemClick }: BottomNavProps) {
  const items = navItems;
  const location = useLocation();

  const [activeId, setActiveId] = useState(
    defaultActive || items[0]?.url
  );

  const controls = useAnimation();
  const [hasMounted, setHasMounted] = useState(false);

  const activeIndex = items.findIndex(
    item => item.url === activeId
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setActiveId(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (activeIndex < 0) return;

    if (!hasMounted) {
      controls.set({
        left: `${(activeIndex / items.length) * 100}%`,
        width: `${100 / items.length}%`,
        top: '4px',
        bottom: '4px',
      });
      return;
    }

    controls.start({
      left: `${(activeIndex / items.length) * 100}%`,
      width: `${100 / items.length}%`,
      scale: [0.9, 1.1, 0.9],
      transition: {
        left: {
          type: 'spring',
          stiffness: 320,
          damping: 28
        },
        width: {
          type: 'spring',
          stiffness: 320,
          damping: 28
        },
      }
    });
  }, [activeIndex, hasMounted, controls, items.length]);

  const handleClick = (id: string) => {
    setActiveId(id);
    onItemClick?.(id);
  };

  return (
    <div className="fixed bottom-[20px] left-[10px] right-[10px] z-50 sm:hidden">
      <div className="relative bg-white dark:bg-gray-800 rounded-[35px] p-1 shadow-lg">
        
        <motion.div
          className="absolute bg-gray-200 dark:bg-gray-700 rounded-[60px]"
          animate={controls}
          initial={false}
          style={{
            zIndex: 0
          }}
        />

        <div className="relative z-10 flex justify-around">
          {items.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              onClick={() => handleClick(item.url)}
              className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${
                activeId === item.url
                  ? 'text-black dark:text-white'
                  : 'text-gray-400'
              }`}
            >
              <div className="text-2xl">
                <item.icon />
              </div>
              <span className="text-xs mt-1">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}